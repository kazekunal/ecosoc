"use client"; // Ensures this is a client component

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Cart() {
  const { items, total, customerId, updateQuantity, removeItem, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure we are on the client before accessing localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle checkout with Paytm
  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!name || !mobile) {
      alert("Please fill in your name and mobile number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/get-paytm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          customerId,
          items,
          customerInfo: { name, mobile },
        }),
      });

      const data = await response.json();

      if (!data.txnToken) {
        alert("Error creating payment. Please try again.");
        return;
      }

      // Save order details to localStorage only on client-side
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "currentOrder",
          JSON.stringify({
            orderId: data.orderId,
            amount: data.amount,
            items,
            customerInfo: { name, mobile },
          })
        );
      }

      // Redirect to Paytm payment page
      window.location.href = `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}&orderId=${data.orderId}&txnToken=${data.txnToken}`;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="w-full max-w-md bg-white shadow-lg border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-700">Your Cart</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ShoppingCart className="h-16 w-16 text-blue-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="default" 
              onClick={() => router.push("/#tickets")} 
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Browse Tickets
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 md:p-8">
      <Card className="w-full max-w-3xl shadow-xl border-2 border-blue-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl font-bold">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8">
            <h3 className="text-lg font-semibold text-blue-700">Your Tickets</h3>
            {isClient ? (
              items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <h4 className="font-medium text-blue-800">{item.name}</h4>
                    <p className="text-sm text-blue-600">₹{item.price.toFixed(2)}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Badge>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 bg-blue-50 p-6 rounded-b-lg">
          <Button 
            variant="outline" 
            onClick={clearCart} 
            className="w-full sm:w-auto border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            Clear Cart
          </Button>
          <Button
            variant="default"
            onClick={handleCheckout}
            disabled={isLoading || !name || !mobile}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
