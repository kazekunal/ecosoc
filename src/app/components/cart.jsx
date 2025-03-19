"use client"

import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { ShoppingCart, Ticket, User, Users, Hotel, CreditCard, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PayNowButton from "./pay"

export default function Cart() {
  const { items, total, customerId, updateQuantity, removeItem, clearCart, isClient } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [needsAccommodation, setNeedsAccommodation] = useState(false)
  const [isSNUStudent, setIsSNUStudent] = useState(false)
  const [wantsPoker, setWantsPoker] = useState(false)
  const [participants, setParticipants] = useState([{ name: "", mobile: "", email: "" }])
  const router = useRouter()

  // Define pass quantities for each ticket type
  const passQuantities = {
    "Single Pass": 1,
    "Pair Pass": 2,
    "Party Pass": 4,
  }

  // Calculate total number of people based on the tickets in cart
  const totalPeople = items.reduce((acc, item) => {
    const peoplePerPass = passQuantities[item.name]
    return acc + (peoplePerPass * item.quantity)
  }, 0)

  // Initialize participant forms based on ticket type when items change
  useEffect(() => {
    // Reset participants array with empty objects based on total people
    if (totalPeople > 0) {
      setParticipants(Array(totalPeople).fill().map(() => ({ 
        name: "", 
        mobile: "", 
        email: "", 
        isSnuStudent: false, 
        accommodation: false 
      })))
    } else {
      setParticipants([{ name: "", mobile: "", email: "", isSnuStudent: false, accommodation: false }])
    }
  }, [totalPeople])

  // Update participant details
  const updateParticipant = (index, field, value) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }
    setParticipants(updatedParticipants)
  }

  // Update all participants when certain global checkboxes change
  useEffect(() => {
    const updatedParticipants = participants.map(participant => ({
      ...participant,
      isSnuStudent: isSNUStudent,
      accommodation: needsAccommodation
    }))
    setParticipants(updatedParticipants)
  }, [isSNUStudent, needsAccommodation])

  // Calculate additional charges
  const accommodationCharge = needsAccommodation ? 250 * totalPeople : 0
  const pokerCharge = wantsPoker ? 150 * totalPeople : 0
  const additionalCharges = accommodationCharge + pokerCharge
  const grandTotal = total + additionalCharges

  // Set accommodation to false when SNU student status changes to yes
  useEffect(() => {
    if (isSNUStudent) {
      setNeedsAccommodation(false)
    }
  }, [isSNUStudent])

  // Prepare checkout items
  const prepareCheckoutItems = () => {
    const checkoutItems = [...items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }))]

    // Add accommodation if needed
    if (needsAccommodation) {
      checkoutItems.push({
        id: "accommodation",
        name: "ACCOMMODATION",
        quantity: totalPeople,
        price: 250,
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

    return checkoutItems;
  }

  // Validate if all required fields are filled
  const areAllFieldsFilled = () => {
    // Check if there are any participants
    if (totalPeople === 0) return false
    
    // Check if all participant fields are filled
    return participants.slice(0, totalPeople).every(participant => 
      participant.name?.trim() !== "" && 
      participant.mobile?.trim() !== "" && 
      participant.email?.trim() !== ""
    );
  }

  // Add this function before handleCheckout
  const handlePaymentSuccess = async (response, checkoutItems) => {
    try {
      console.log("🔹 Payment successful, processing verification...");
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
          participants: participants.slice(0, totalPeople),
          needsAccommodation,
          isSNUStudent,
        }),
      });
  
      const verifyData = await verifyResponse.json();
  
      if (verifyData.success) {
        console.log("✅ Payment verification successful, sending confirmation email");
        
        try {
          const participantData = participants.slice(0, totalPeople).map(p => ({
            ...p,
            isSnuStudent: isSNUStudent,
            accommodation: needsAccommodation
          }));
          
          console.log("🔹 Sending confirmation email with data:", {
            orderId: response.razorpay_order_id,
            items: checkoutItems,
            participants: participantData,
            needsAccommodation,
            isSNUStudent,
            totalAmount: grandTotal
          });
  
          const emailResponse = await fetch("/api/send-confirmation-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              items: checkoutItems,
              participants: participantData,
              needsAccommodation,
              isSNUStudent,
              totalAmount: grandTotal,
            }),
          });
  
          console.log("🔹 Email API response status:", emailResponse.status);
          const emailData = await emailResponse.json();
          
          if (emailResponse.ok) {
            console.log("✅ Confirmation email sent successfully:", emailData);
          } else {
            console.error("❌ Failed to send confirmation email:", emailData.error || emailData);
          }
        } catch (emailError) {
          console.error("❌ Error sending confirmation email:", emailError);
        }
  
        alert("Payment successful! Your tickets are confirmed. A confirmation email has been sent.");
        clearCart();
        router.push("/thank-you");
      } else {
        console.error("❌ Payment verification failed:", verifyData);
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("❌ Payment verification error:", error);
      alert("Error during payment verification. Please contact support.");
    }
  };

  // Show loading state during client-side hydration
  if (!isClient) {
    return (
      <div className="flex justify-center items-center p-8 h-32">
        <div className="text-blue-600 dark:text-blue-400">Loading cart...</div>
      </div>
    )
  }
  
  if (typeof window !== "undefined" && !window.Razorpay) {
    console.error("Razorpay JS not loaded")
    alert("Payment gateway not available. Please try again later.")
    return null
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-200 dark:border-blue-900">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">Your Cart</CardTitle>
            <CardDescription className="dark:text-gray-300">Your cart is currently empty</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ShoppingCart className="h-16 w-16 text-blue-500 dark:text-blue-400" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="default"
              onClick={() => router.push("/#tickets")}
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
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
      <Card className="w-full max-w-3xl shadow-xl border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Checkout</CardTitle>
              <CardDescription className="text-white/90">Complete your ticket purchase</CardDescription>
            </div>
            <ShoppingCart className="h-8 w-8" />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Cart Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700 dark:text-white">
                <Ticket className="mr-2 h-5 w-5" />
                Your Tickets
              </h3>

              <ScrollArea className="h-48 rounded-md border-2 border-blue-100 dark:border-blue-900 p-4 bg-blue-50 dark:bg-gray-900">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-blue-600 dark:text-white">₹{item.price.toFixed(2)}</p>
                          {passQuantities[item.name] > 1 && (
                            <span className="text-xs text-blue-500 dark:text-white">
                              For {passQuantities[item.name]} people
                            </span>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="flex items-center">
                        <div className="ml-auto">
                          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                      <Separator className="my-2 bg-blue-100 dark:bg-blue-800" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* SNU Student Question */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="snuStudent"
                  checked={isSNUStudent}
                  onCheckedChange={(checked) => {
                    // Log the actual checkbox state
                    console.log("SNU Student checkbox changed to:", checked);
                    setIsSNUStudent(checked === true);
                  }}
                  className="text-blue-600 border-blue-400 focus:ring-blue-500 dark:text-blue-500 dark:border-blue-700 dark:focus:ring-blue-600"
                />
                <Label htmlFor="snuStudent" className="flex items-center cursor-pointer text-blue-800 dark:text-white font-medium">
                  <User className="mr-2 h-4 w-4" />Are you an SNU Student?
                </Label>
              </div>
            </div>

            {/* Accommodation Option - Only show if not SNU Student or make it required */}
            {!isSNUStudent && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="accommodation"
                    checked={needsAccommodation}
                    onCheckedChange={(checked) => {
                      // Log the actual checkbox state
                      console.log("Accommodation checkbox changed to:", checked);
                      setNeedsAccommodation(checked === true);
                    }}
                    className="text-blue-600 border-blue-400 focus:ring-blue-500 dark:text-blue-500 dark:border-blue-700 dark:focus:ring-blue-600"
                  />
                  <Label htmlFor="accommodation" className="flex items-center cursor-pointer text-blue-800 dark:text-white">
                    <Hotel className="mr-2 h-4 w-4" />I need accommodation 
                  </Label>
                </div>

                {needsAccommodation && (
                  <div className="pl-6 border-l-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 p-2 rounded mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-blue-800 dark:text-white">
                        <Hotel className="mr-2 h-4 w-4" />
                        <span>ACCOMMODATION (includes breakfast and dinner) (250 per person)</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-white dark:border-blue-800">
                        {totalPeople > 1 ? `${totalPeople} × ₹250 = ` : ""}
                        ₹{accommodationCharge.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Participant Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700 dark:text-white">
                <Users className="mr-2 h-5 w-5" />
                Participant Information
                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800">
                  {totalPeople} {totalPeople === 1 ? 'person' : 'people'}
                </Badge>
              </h3>

              <Accordion type="single" collapsible className="w-full">
  {Array.from({ length: totalPeople }).map((_, index) => {
    const participant = participants[index] || {}; // Ensure there's an object even if missing

    return (
      <AccordionItem
        key={index}
        value={`participant-${index}`}
        className="border-blue-200 dark:border-blue-800"
      >
        <AccordionTrigger className="hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 rounded-md">
          <div className="flex items-center text-left">
            <User className="mr-2 h-4 w-4" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {participant.name ? participant.name : `Participant ${index + 1}`}
            </span>
            {!participant.name || !participant.mobile || !participant.email ? (
              <Badge
                variant="outline"
                className="ml-2 bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
              >
                Incomplete
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="ml-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
              >
                Complete
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="grid gap-2">
              <Label htmlFor={`name-${index}`} className="text-blue-800 dark:text-blue-300">
                Full Name
              </Label>
              <Input
                id={`name-${index}`}
                placeholder="Enter full name"
                value={participant.name || ""}
                onChange={(e) => updateParticipant(index, "name", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`mobile-${index}`} className="text-blue-800 dark:text-blue-300">
                Mobile Number
              </Label>
              <Input
                id={`mobile-${index}`}
                placeholder="Enter mobile number"
                value={participant.mobile || ""}
                onChange={(e) => updateParticipant(index, "mobile", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`email-${index}`} className="text-blue-800 dark:text-blue-300">
                Email Address (for ticket delivery)
              </Label>
              <Input
                id={`email-${index}`}
                placeholder="Enter email address"
                value={participant.email || ""}
                type="email"
                onChange={(e) => updateParticipant(index, "email", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  })}
</Accordion>

            </div>
          {/* Summary */}
          <div className="mt-8 pt-4 border-t border-blue-200 dark:border-blue-800">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 dark:text-white">Tickets Subtotal:</span>
                  <span className="text-blue-800 dark:text-white">₹{total.toFixed(2)}</span>
                </div>

                {totalPeople > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 dark:text-white">Total Participants:</span>
                    <span className="text-blue-800 dark:text-white">{totalPeople}</span>
                  </div>
                )}

                {isSNUStudent && (
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 dark:text-white">SNU Student:</span>
                    <span className="text-blue-800 dark:text-white">Yes</span>
                  </div>
                )}

                {accommodationCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 dark:text-white">Accommodation ({totalPeople} × ₹250):</span>
                    <span className="text-blue-800 dark:text-white">₹{accommodationCharge.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200 dark:border-blue-800">
                  <span className="text-blue-800 dark:text-white">Total:</span>
                  <span className="text-blue-700 dark:text-white">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-b-lg">
          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full sm:w-auto border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-white dark:hover:bg-blue-900/40"
          >
            Clear Cart
          </Button>
          
          <PayNowButton 
            amount={grandTotal} 
            clearCart={clearCart}
            disabled={!areAllFieldsFilled()}
            participants={participants.slice(0, totalPeople).map(p => ({
              ...p,
              isSnuStudent: isSNUStudent,
              accommodation: needsAccommodation
            }))}
            items={prepareCheckoutItems()}
            needsAccommodation={needsAccommodation}
            isSNUStudent={isSNUStudent}
          />
        </CardFooter>
      </Card>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-white dark:bg-[#121212] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  )
}