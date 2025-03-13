"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { ShoppingCart, Ticket, User, School, Hotel, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import PayNowButton from "./pay"

export default function Cart() {
  const { items, total, customerId, updateQuantity, removeItem, clearCart, isClient } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [isSNUStudent, setIsSNUStudent] = useState(true)
  const [wantsPoker, setWantsPoker] = useState(false)
  const router = useRouter()

  // Define pass quantities for each ticket type
  const passQuantities = {
    "Single Pass": 1,
    "Pair Pass": 2,
    "Party Pass": 4,
  };

  if (typeof window !== "undefined" && !window.Razorpay) {
    console.error("Razorpay JS not loaded");
    alert("Payment gateway not available. Please try again later.");
    return;
  }

  // Calculate total number of people based on the tickets in cart
  const totalPeople = items.reduce((acc, item) => {
    // Get quantity per pass type, defaulting to 1 if not found
    const peoplePerPass = passQuantities[item.name] || 1;
    // Multiply by the number of passes
    return acc + (peoplePerPass * item.quantity);
  }, 0);

  // Calculate additional charges based on total people
  const accommodationCharge = !isSNUStudent ? 500 * totalPeople : 0;
  const pokerCharge = wantsPoker ? 150 * totalPeople : 0;
  const additionalCharges = accommodationCharge + pokerCharge;
  const grandTotal = total + additionalCharges;

  // Handle checkout with Razorpay
  const handleCheckout = async () => {
    if (items.length === 0) return
    if (!name || !mobile) {
      alert("Please fill in your name and mobile number")
      return
    }
  
    setIsLoading(true)

    try {
      // Prepare items array with additional charges if applicable
      const checkoutItems = [...items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))]
  
      // Add accommodation if needed
      if (!isSNUStudent) {
        checkoutItems.push({
          id: "accommodation",
          name: "ACCOMMODATION",
          quantity: totalPeople,
          price: 500,
        })
      }
  
      // Add poker buy-in if selected
      if (wantsPoker) {
        checkoutItems.push({
          id: "poker",
          name: "Poker Buy-in",
          quantity: totalPeople,
          price: 150,
        })
      }
  
      console.log("Making API request with data:", {
        amount: grandTotal * 100,
        customerId,
        items: checkoutItems,
        customerInfo: { name, mobile, isSNUStudent },
      })
  
      // Create order with Razorpay
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: grandTotal * 100, // Razorpay amount in paise
          customerId,
          items: checkoutItems,
          customerInfo: {
            name,
            mobile,
            isSNUStudent,
          },
        }),
      })
  
      const data = await response.json()
      
      console.log("API response:", data)
  
      if (!data.order_id) {
        console.error("Order ID missing from response:", data)
        alert("Error creating payment: " + (data.error || "No order ID returned"))
        setIsLoading(false)
        return
      }

      // Initialize Razorpay payment
      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: grandTotal * 100, // in paise
        currency: "INR",
        name: "SNU Event",
        description: "Ticket Purchase",
        order_id: data.order_id,
        handler: async function (response) {
          // Handle payment success
          try {
            const verifyResponse = await fetch("/api/verify-razorpay-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: grandTotal,
                items: checkoutItems,
                customerInfo: {
                  name,
                  mobile,
                  isSNUStudent,
                },
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              // Payment successful
              alert("Payment successful! Your tickets are confirmed.")
              clearCart()
              router.push("/thank-you") // Redirect to thank you page
            } else {
              // Payment verification failed
              alert("Payment verification failed. Please contact support.")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            alert("Error during payment verification. Please contact support.")
          }
        },
        prefill: {
          name: name,
          contact: mobile,
        },
        theme: {
          color: "#2563eb", // blue-600
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
      }

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Error during checkout. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state during client-side hydration
  if (!isClient) {
    return (
      <div className="flex justify-center items-center p-8 h-32">
        <div className="text-blue-600">Loading cart...</div>
      </div>
    )
  }
  if (!window.Razorpay) {
    console.error("Razorpay JS not loaded");
    alert("Payment gateway not available. Please try again later.");
    setIsLoading(false);
    return;
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="w-full max-w-md bg-white shadow-lg border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-700">Your Cart</CardTitle>
            <CardDescription>Your cart is currently empty</CardDescription>
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
    )
  }

  return (
    <div className="flex justify-center p-4 md:p-8">
      <Card className="w-full max-w-3xl shadow-xl border-2 border-blue-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Checkout</CardTitle>
              <CardDescription className="text-white/90">Complete your ticket purchase</CardDescription>
            </div>
            <ShoppingCart className="h-8 w-8" />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Cart Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
                <Ticket className="mr-2 h-5 w-5" />
                Your Tickets
              </h3>

              <ScrollArea className="h-[250px] rounded-md border-2 border-blue-100 p-4 bg-blue-50">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-blue-800">{item.name}</h4>
                          <p className="text-sm text-blue-600">₹{item.price.toFixed(2)}</p>
                          {passQuantities[item.name] > 1 && (
                            <span className="text-xs text-blue-500">
                              For {passQuantities[item.name]} people
                            </span>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center border rounded-md border-blue-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-blue-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-blue-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>

                        <div className="ml-auto">
                          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                      <Separator className="my-2 bg-blue-100" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Customer Information Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
                <User className="mr-2 h-5 w-5" />
                Your Information
              </h3>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-blue-800">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mobile" className="text-blue-800">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="snu-student"
                    checked={isSNUStudent}
                    onCheckedChange={(checked) => setIsSNUStudent(checked === true)}
                    className="text-blue-600 border-blue-400 focus:ring-blue-500"
                  />
                  <Label htmlFor="snu-student" className="flex items-center cursor-pointer text-blue-800">
                    <School className="mr-2 h-4 w-4" />I am an SNU student
                  </Label>
                </div>

                {!isSNUStudent && (
                  <div className="pl-6 border-l-2 border-blue-300 bg-blue-50 p-2 rounded">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-blue-800">
                        <Hotel className="mr-2 h-4 w-4" />
                        <span>ACCOMMODATION (₹500 per person)</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {totalPeople > 1 ? `${totalPeople} × ₹500 = ` : ""}
                        ₹{accommodationCharge.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="poker"
                    checked={wantsPoker}
                    onCheckedChange={(checked) => setWantsPoker(checked === true)}
                    className="text-blue-600 border-blue-400 focus:ring-blue-500"
                  />
                  <Label htmlFor="poker" className="flex items-center cursor-pointer text-blue-800">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Wanna try your luck at poker? (₹150 buy-in per person)
                  </Label>
                </div>

                {wantsPoker && (
                  <div className="pl-6 border-l-2 border-blue-300 bg-blue-50 p-2 rounded">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-blue-800">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>POKER BUY-IN (₹150 per person)</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {totalPeople > 1 ? `${totalPeople} × ₹150 = ` : ""}
                        ₹{pokerCharge.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 pt-4 border-t border-blue-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">Tickets Subtotal:</span>
                <span className="text-blue-800">₹{total.toFixed(2)}</span>
              </div>

              {totalPeople > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600">Total People:</span>
                  <span className="text-blue-800">{totalPeople}</span>
                </div>
              )}

              {additionalCharges > 0 && (
                <>
                  {accommodationCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Accommodation ({totalPeople} × ₹500):</span>
                      <span className="text-blue-800">₹{accommodationCharge.toFixed(2)}</span>
                    </div>
                  )}

                  {pokerCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Poker Buy-in ({totalPeople} × ₹150):</span>
                      <span className="text-blue-800">₹{pokerCharge.toFixed(2)}</span>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200">
                <span className="text-blue-800">Total:</span>
                <span className="text-blue-700">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
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
          <PayNowButton 
            amount={grandTotal} 
            clearCart={clearCart}
          />
          {/* <Button
            variant="default"
            onClick={handleCheckout}
            disabled={isLoading || !name || !mobile}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button> */}
        </CardFooter>
      </Card>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#121212] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  )
}