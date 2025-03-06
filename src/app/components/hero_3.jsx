import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full flex justify-center">
      <div className="container mx-auto px-4 py-24 md:py-32 space-y-8 lg:space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 px-3 py-1 text-sm text-[#2662d9]">
            The Economic Society Presents
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            IQTISADIYYAT <span className="text-[#2662d9]">2025</span>
          </h1>
          <p className="max-w-[700px] text-[#6f6f7b] md:text-xl">
            The premier economics conclave that brings together thought leaders,
            interactive learning, and a culinary experience like no other.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[#2662d9]" />
              <span>April 15-16, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[#2662d9]" />
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-[#2662d9]" />
              <span>Shiv Nadar University, Greater Noida</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" asChild className="bg-[#2662d9] hover:bg-[#2626d0] text-lg">
            <Link href="#tickets">
              Buy Your Ticket <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg">
            <Link href="#schedule">View Schedule</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </section>
  );
}