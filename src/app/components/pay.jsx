"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PayNowButton = ({ amount, clearCart, disabled, participants, items, needsAccommodation }) => { 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                }),
            });
    
            const verifyData = await verifyResponse.json();
            console.log("✅ Payment verification response:", verifyData);
    
            if (verifyData.success) {
                console.log("✅ Payment verified, sending confirmation email...");
                
                // Use the participants data passed as props
                const participantsData = participants || [];
                console.log("🔹 Participants data:", participantsData);
    
                const emailResponse = await fetch("/api/send-confirmation-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        items: items,
                        participants: participantsData, 
                        needsAccommodation: needsAccommodation,
                        totalAmount: amount,
                    }),
                });
    
                const emailData = await emailResponse.json();
                console.log("📩 Email send response:", emailData);
    
                if (emailResponse.ok) {
                    console.log("✅ Confirmation email sent successfully");
                } else {
                    console.error("❌ Email failed:", emailData.error || emailData);
                }
                clearCart();
                router.push(`/confirmation?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&amount=${(amount).toFixed(2)}`);
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

        setLoading(true);

        try {
            // Include participants data in the request to create the order
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    amount, 
                    currency: "INR",
                    participants: participants,
                    items: items,
                    needsAccommodation: needsAccommodation
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
                    name: participants && participants.length > 0 ? participants[0].name : "Your Name",
                    contact: participants && participants.length > 0 ? participants[0].mobile : "9999999999",
                    email: participants && participants.length > 0 ? participants[0].email : "",
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