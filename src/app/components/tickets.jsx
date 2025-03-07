import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tickets = [
    {
      name: "Student Pass",
      price: "999",
      features: [
        "Access to all keynote sessions",
        "Participation in workshops",
        "Lunch and refreshments",
        "Economics games access",
        "Digital certificate of participation",
      ],
      featured: false,
    },
    {
      name: "Full Access Pass",
      price: "2499",
      features: [
        "Access to all keynote sessions",
        "Priority seating for main events",
        "All workshops and breakout sessions",
        "Premium lunch and refreshments",
        "Economics games access",
        "Networking reception",
        "Digital certificate of participation",
      ],
      featured: true,
    },
    {
      name: "Professional Pass",
      price: "3999",
      features: [
        "All Full Access Pass benefits",
        "Exclusive dinner with speakers",
        "One-on-one mentoring session",
        "Premium gift bag",
        "1-year subscription to Economics Society journal",
        "Recording access post-event",
      ],
      featured: false,
    },
  ]

export default function Tickets() {
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
            Don't miss this opportunity to be part of IQTISADIYYAT 2024.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tickets.map((ticket, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${
                ticket.featured ? "border-[#2662d9] shadow-lg ring-2 ring-[#2662d9]" : ""
              }`}
            >
              {ticket.featured && (
                <div className="bg-[#2662d9] text-[#2662d9]-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6 pt-8 text-center">
                <h3 className="text-2xl font-bold">{ticket.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold">₹{ticket.price}</span>
                  <span className="ml-1 text-[#2662d9]">/person</span>
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
                  asChild
                >
                  <Link href="/payment">Buy Ticket</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-[#2662d9]">
            Group discounts available for 5+ tickets.{" "}
            <Link href="#" className="text-[#2662d9] underline">
              Contact us
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </section>
  );
}