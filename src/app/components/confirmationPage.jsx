"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "./navbar";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    paymentId: "",
    amount: 0,
    timestamp: ""
  });
  const [hasValidOrder, setHasValidOrder] = useState(false);

  useEffect(() => {
    // Get order ID, payment ID, and amount from URL parameters
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId");
    const amount = searchParams.get("amount");
    
    // Check if we have valid order details
    const isValidOrder = !!(orderId && amount);
    setHasValidOrder(isValidOrder);
    
    // Set the order details
    setOrderDetails({
      orderId: orderId || "N/A",
      paymentId: paymentId || "N/A",
      amount: amount || "N/A",
      timestamp: new Date().toLocaleString()
    });
  }, [searchParams]);

  // Render different views based on whether we have valid order details
  if (!hasValidOrder) {
    return (
        <>
        <Navbar/>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-yellow-100 rounded-full p-3">
                <svg 
                  className="h-8 w-8 text-yellow-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
              No Order Found
            </h2>
            
            <p className="text-center text-gray-600 mb-8">
              Kindly book a ticket to view your confirmation details.
            </p>
            
            <div className="flex justify-center">
              <Link href="/#tickets" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Default view for successful orders
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-green-100 rounded-full p-3">
              <svg 
                className="h-8 w-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            Payment Successful!
          </h2>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium">{orderDetails.paymentId}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium">₹{orderDetails.amount}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{orderDetails.timestamp}</span>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            Thank you for your purchase! You will receive a confirmation email shortly.
          </p>
          
          <div className="flex justify-center">
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}