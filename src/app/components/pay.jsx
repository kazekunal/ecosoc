"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PayNowButton = ({ amount, clearCart }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePayment = async () => {
        if (!amount || amount <= 0) {
            alert("Invalid amount. Please check your cart.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, currency: "INR" }) // Use dynamic amount
            });

            const orderData = await response.json();
            console.log("📦 Order Data:", orderData); // Debugging

            if (!orderData || !orderData.id) {
                throw new Error(orderData.error || "Failed to create order");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "SNU Event",
                description: "Ticket Purchase",
                order_id: orderData.id,
                handler: (response) => {
                    console.log("✅ Payment Success:", response);
                    
                    // Clear the cart
                    if (typeof clearCart === 'function') {
                        clearCart();
                    }
                    
                    // Store amount for confirmation page
                    const amountInRupees = (orderData.amount / 100).toFixed(2);
                    
                    // Redirect to confirmation page with payment details including amount
                    router.push(`/confirmation?orderId=${orderData.id}&paymentId=${response.razorpay_payment_id}&amount=${amountInRupees}`);
                },
                prefill: {
                    name: "Your Name",
                    contact: "9999999999",
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
        <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
        >
            {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
    );
};

export default PayNowButton;