import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full flex justify-center">
      <div className="container mx-auto px-4 py-24 md:py-32 space-y-8 lg:space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 dark:bg-[#2662d9]/20 px-3 py-1 text-sm text-[#2662d9] dark:text-[#6b9eff]">
            The Economic Society Presents
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-black dark:text-white">
            IQTISADIYYAT <span className="text-[#2662d9] dark:text-[#6b9eff]">2025</span>
          </h1>
          <p className="max-w-[700px] text-[#6f6f7b] dark:text-[#a1a1b5] md:text-xl">
            The premier economics conclave that brings together thought leaders,
            interactive learning, and a culinary experience like no other.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-black dark:text-white">
              <Calendar className="h-4 w-4 text-[#2662d9] dark:text-[#6b9eff]" />
              <span>April 15-16, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-white">
              <Clock className="h-4 w-4 text-[#2662d9] dark:text-[#6b9eff]" />
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-white">
              <MapPin className="h-4 w-4 text-[#2662d9] dark:text-[#6b9eff]" />
              <span>Shiv Nadar University, Greater Noida</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" asChild className="bg-[#2662d9] hover:bg-[#2626d0] dark:bg-[#3a75e0] dark:hover:bg-[#2f61c2] text-lg">
            <Link href="#tickets">
              Buy Your Ticket <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg border-[#2662d9]/20 text-black dark:text-white dark:border-white/20 hover:bg-[#2662d9]/5 dark:hover:bg-white/5">
            <Link href="#schedule">View Schedule</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#121212] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </section>
  );
}