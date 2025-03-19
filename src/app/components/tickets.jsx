'use client'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

// Define tickets array inside the component
const ticketsData = [
    {
      id: "single-pass", // Added unique ID for each ticket
      name: "Single Pass",
      price: 299, // Changed to number for calculations
      features: [
        "Includes Access to a single person",
        "Access to all keynote sessions",
        "Participation in workshops",
        "Lunch and refreshments",
        "Economics games access",
        "Digital certificate of participation",
      ],
      featured: false,
    },
    {
      id: "pair-pass", // Added unique ID for each ticket
      name: "Pair Pass",
      price: 549, // Changed to number for calculations
      features: [
        "Includes Access to 2 people",
        "Access to all keynote sessions",
        "All workshops and breakout sessions",
        "Lunch and refreshments",
        "Economics games access",
        "Networking reception",
        "Digital certificate of participation",
      ],
      featured: true,
    },
    {
      id: "party-pass", // Added unique ID for each ticket
      name: "Party Pass",
      price: 999, // Changed to number for calculations
      features: [
        "Includes Access to 4 people",
        "Access to all keynote sessions",
        "All workshops and breakout sessions",
        "Lunch and refreshments",
        "Economics games access",
        "Networking reception",
        "Digital certificate of participation",
      ],
      featured: false,
    },
  ]

export default function Tickets() {
    const { addItem } = useCart();
    const router = useRouter();
    
    const handleBuyTicket = (selectedTicket) => {
      // Add the ticket to cart
      addItem({
        id: selectedTicket.id,
        name: selectedTicket.name,
        price: selectedTicket.price,
        quantity: 1
      });
      
      // Redirect to payment page
      router.push('/cart');
    };

  return (
    <section id="tickets" className="dark:bg-black w-full flex justify-center py-16 md:py-24 relative overflow-hidden">
      <div className="mx-auto px-4 container relative z-10 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 px-3 py-1 text-sm text-[#2662d9]">
            Limited Tickets Available
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Secure Your Spot Today
          </h2>
          <p className="max-w-[700px] text-[#2662d9] md:text-xl">
            Don't miss this opportunity to be part of IQTISADIYYAT 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ticketsData.map((ticket, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${
                ticket.featured ? "border-[#2662d9] shadow-lg ring-2 ring-[#2662d9]" : ""
              }`}
            >
              {ticket.featured && (
                <div className="bg-[#2662d9] text-[#2662d9]-foreground text-center py-1 text-sm font-medium">
                  Early Bird offers!! <br/>Get your tickets now.
                </div>
              )}
              <CardContent className="p-6 pt-8 text-center">
                <h3 className="text-2xl font-bold">{ticket.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold">₹{ticket.price}</span>
                  <span className="ml-1 text-[#2662d9]"></span>
                </div>
                <ul className="mt-6 space-y-3 text-left">
                  {ticket.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <ArrowRight className="h-5 w-5 text-[#2662d9] flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  size="lg"
                  variant={ticket.featured ? "default" : "outline"}
                  onClick={() => handleBuyTicket(ticket)}
                >
                  Buy Ticket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-[#2662d9]">
            Group discounts available for 10+ tickets.{" "}
            <Link href="/contact" className="text-[#2662d9] underline">
              See our FAQ's 
            </Link>{" "}
            for further details.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </section>
  );
}