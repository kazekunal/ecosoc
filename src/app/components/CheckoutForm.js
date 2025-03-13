import React, { useState } from 'react';
import Script from 'next/script';

export default function CheckoutForm({ amount, orderId }) {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    setPaymentProcessing(true);
    
    const res = await initializeRazorpay();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      setPaymentProcessing(false);
      return;
    }
    
    // Make API call to create order
    const data = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
      }),
    }).then((t) => t.json());
    
    const options = {
        key: data.key_id,
      name: "Economics Society",
      currency: "INR",
      amount: amount * 100,
      order_id: data.order_id,
      description: "Thank you for your purchase",
      handler: async function (response) {
        // Send verification request to backend
        const verificationData = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }).then((res) => res.json());
        
        if (verificationData.success) {
          alert('Payment successful');
          // Redirect to success page or update UI
          window.location.href = '/payment-success';
        } else {
          alert('Payment verification failed');
        }
        setPaymentProcessing(false);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
    paymentObject.on('payment.failed', function (response) {
      alert(response.error.description);
      setPaymentProcessing(false);
    });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Complete Your Purchase</h2>
        <div className="flex justify-between mb-4">
          <span>Order Total:</span>
          <span className="font-bold">₹{amount}</span>
        </div>
        <button
          onClick={makePayment}
          disabled={paymentProcessing}
          className={`w-full py-2 px-4 rounded-md text-white ${
            paymentProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {paymentProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}
