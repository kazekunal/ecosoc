"use client";
import { useState } from "react";

const PayNowButton = ({ amount }) => {
    const [loading, setLoading] = useState(false);

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
                // body: JSON.stringify({ amount: testAmount, currency: "INR" })
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
                    alert("Payment successful!");
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
            {loading ? "Processing..." : `Pay ₹1`}
        </button>
    );
};

export default PayNowButton;
