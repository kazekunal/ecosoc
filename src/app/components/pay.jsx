"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PayNowButton = ({ amount, clearCart, disabled, participants, items, needsAccommodation, isSNUStudent }) => { 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitToGoogleSheets = async (formData) => {
        try {
            console.log("📊 Submitting data to Google Sheets...");
            const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
            
            if (!GOOGLE_SCRIPT_URL) {
                console.error("❌ Google Script URL not defined in environment variables");
                return false;
            }
            
            if (!formData) {
                console.error("❌ No form data provided");
                return false;
            }
            
            // Ensure we have the correct boolean values for checkbox fields
            formData.participants = Array.isArray(formData.participants) ? formData.participants.map(p => ({
                name: p?.name || "N/A",
                email: p?.email || "N/A",
                mobile: p?.mobile || "N/A",
                isSnuStudent: Boolean(p?.isSnuStudent),
                accommodation: Boolean(p?.accommodation)
            })) : [];
            
            // Log the transformed data before sending
            console.log("📊 Sending data to Google Sheets:", JSON.stringify(formData));
            
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            console.log("✅ Data submitted to Google Sheets successfully");
            return true;
        } catch (error) {
            console.error("❌ Error submitting to Google Sheets:", error);
            return false;
        }
    };

    const handlePaymentSuccess = async (response, orderData) => {
        try {
            console.log("🔹 Payment successful, verifying with server...");

            const verifyResponse = await fetch("/api/verify-razorpay-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    amount: orderData.amount,
                    needsAccommodation: needsAccommodation,
                    isSNUStudent: isSNUStudent
                }),
            });

            const verifyData = await verifyResponse.json();
            console.log("✅ Payment verification response:", verifyData);

            if (verifyData.success) {
                console.log("✅ Payment verified, sending confirmation email...");
                
                // Log the incoming participants data
                console.log("Participants data before processing:", participants);
                
                // Check if we have the correct boolean values for each participant
                const participantsWithFlags = participants.map(p => ({
                    ...p,
                    isSnuStudent: Boolean(p.isSnuStudent),
                    accommodation: Boolean(p.accommodation)
                }));

                // Log the transformed participants data
                console.log("Participants data after boolean conversion:", participantsWithFlags);
                
                const googleSheetsData = {
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    amount: amount,
                    paymentDate: new Date().toISOString().split('T')[0],
                    participants: participantsWithFlags,
                    needsAccommodation: Boolean(needsAccommodation),
                    isSNUStudent: Boolean(isSNUStudent)
                };
                
                // Log the Google Sheets data before submission
                console.log("Data being sent to Google Sheets:", JSON.stringify(googleSheetsData));
                
                await submitToGoogleSheets(googleSheetsData);

                const emailResponse = await fetch("/api/send-confirmation-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        items: items,
                        participants: participantsWithFlags, 
                        needsAccommodation: Boolean(needsAccommodation),
                        isSNUStudent: Boolean(isSNUStudent),
                        totalAmount: amount,
                    }),
                });

                if (emailResponse.ok) {
                    console.log("✅ Confirmation email sent successfully");
                } else {
                    console.error("❌ Email failed:", await emailResponse.json());
                }
                clearCart();
                router.push(`/confirmation?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&amount=${amount.toFixed(2)}`);
            } else {
                console.error("❌ Payment verification failed:", verifyData);
                alert("Payment verification failed. Please contact support.");
            }
        } catch (error) {
            console.error("❌ Error verifying payment:", error);
            alert("An error occurred during payment verification. Please try again.");
        }
    };
    
    const handlePayment = async () => {
        if (!amount || amount <= 0) {
            alert("Invalid amount. Please check your cart.");
            return;
        }
        
        // Log the participants data before payment
        console.log("Participants data before payment:", participants);
        console.log("Needs Accommodation:", needsAccommodation);
        console.log("Is SNU Student:", isSNUStudent);

        setLoading(true);
        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    amount, 
                    currency: "INR",
                    participants: participants.map(p => ({
                        ...p,
                        isSnuStudent: Boolean(p.isSnuStudent),
                        accommodation: Boolean(p.accommodation)
                    })),
                    items,
                    needsAccommodation: Boolean(needsAccommodation),
                    isSNUStudent: Boolean(isSNUStudent)
                }),
            });

            const orderData = await response.json();
            console.log("📦 Order Data:", orderData);

            if (!orderData || !orderData.id) {
                throw new Error(orderData.error || "Failed to create order");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "IQTISADIYYAT",
                description: "Ticket Purchase",
                order_id: orderData.id,
                handler: (response) => handlePaymentSuccess(response, orderData),
                prefill: {
                    name: participants?.[0]?.name || "Your Name",
                    contact: participants?.[0]?.mobile || "9999999999",
                    email: participants?.[0]?.email || "",
                },
                theme: { color: "#2563eb" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("❌ Payment error:", error);
            alert(error.message || "Payment failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            variant="default"
            onClick={handlePayment}
            disabled={loading || disabled}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
            {loading ? "Processing..." : `Pay ₹${amount}`}
        </Button>
    );
};

export default PayNowButton;