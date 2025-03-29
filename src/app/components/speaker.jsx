'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

const speakers = [
  {
    name: "Dr T.C.A Anant",
    title: "Former Chief Statistician of India",
    bio: "Leading expert in economic statistics and policy analysis, driving data-informed decision-making in India's economic landscape.",
    topic: "Bridging the Urban-Rural Divide",
    image: "/tca.png"
  },
  {
    name: "Dr Santosh K Mehrotra",
    title: "Research Fellow – IZA Institute",
    bio: "Internationally recognized development economist specializing in poverty reduction, labor markets, and inclusive growth strategies.",
    topic: "Global Poverty Strategies",
    image: "/sant.png"
  },
  {
    name: "Dr Abhishek Gupta",
    title: "Chief India Economist, Bloomberg",
    bio: "Renowned economist providing cutting-edge insights into India's financial markets, economic trends, and global economic dynamics.",
    topic: "Economic Market Trends",
    image: "/ab.png"
  },
  {
    name: "Mr. Montek Singh Ahluwalia",
    title: "Padma Vibhushan awardee, Former Deputy Chairman of Planning Commission",
    bio: "Architect of India's economic reforms, with deep expertise in macroeconomic policy, development planning, and strategic economic transformation.",
    topic: "Reimagining India's Economic Future",
    image: "/monty.jpg"
  },
  {
    name: "Mr. Sanjay Bhattacharya",
    title: "Former Ambassador & ex-Secretary, Ministry of External Affairs",
    bio: "Seasoned diplomat with extensive experience in international relations, global economic cooperation, and strategic geopolitical negotiations.",
    topic: "Diplomacy in a Multipolar Economic World",
    image: "/sandy.jpeg"
  },
  {
    name: "Dr. Charan Singh",
    title: "Former Chairman, Punjab & Sind Bank",
    bio: "Banking expert focused on financial inclusion, public policy, and innovative strategies to expand economic opportunities for underserved communities.",
    topic: "Banking the Unbanked: India's Financial Future",
    image: "/char.png"
  },
  {
    name: "Dr. Chandan Jha",
    title: "Program Lead, Council on Energy, Environment and Water",
    bio: "Sustainability researcher connecting food systems, environmental challenges, and innovative approaches to sustainable economic development.",
    topic: "Food Systems and the Future of Sustainability",
    image: "/jha.jpg"
  },
  {
    name: "Mr. Gaurav Kapur",
    title: "Director - Government Relations, CFA Institute",
    bio: "Policy expert bridging finance, education, and governance, driving standards and innovation in financial professional development.",
    topic: "Strengthening Financial Governance",
    image: "/gaur.jpeg"
  },
  {
    name: "Mr. Veenu Jaichand",
    title: "Partner, Performance Improvement- Skill Development in Africa, India & Middle East (AIM) Advisory Services",
    bio: "As a valued Partner at AIM Advisory Services, he fosters transformative growth and capacity building in Africa, India, and the Middle East.",
    topic: "Strategies for Performance Improvement in Emerging Markets",
    image: "/veenu_pp.jpg"
  }
];

export default function SpeakersCarousel() {
  return (
    <section id="speakers" className="w-full flex justify-center bg-[#f4f4f5]/50 dark:bg-[#121212] py-16 md:py-24">
      <div className="mx-auto px-4 container space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 dark:bg-[#2662d9]/20 px-3 py-1 text-sm text-[#2662d9] dark:text-[#6b9eff]">
            Distinguished Speakers
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black dark:text-white">
            Learn from the Best Minds in Economics
          </h2>
          <p className="max-w-[700px] text-[#71717a] dark:text-[#a1a1b5] md:text-xl">
            Our thoughtfully curated lineup of economists, media, policy and industry experts bring you fresh perspectives and innovative ideas
          </p>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent 
            className="-ml-4 flex"
          >
            {speakers.map((speaker, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 md:basis-1/2 lg:basis-1/3 
                  // Mobile view: show 10% of adjacent cards
                  sm:basis-[90%] sm:pr-4"
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg dark:bg-[#252525] dark:border-[#333333] h-full flex flex-col">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-black dark:text-white">{speaker.name}</h3>
                    <p className="text-[#2662d9] dark:text-[#6b9eff] font-medium">{speaker.title}</p>
                    <p className="mt-2 text-[#71717a] dark:text-[#a1a1b5] flex-grow">{speaker.bio}</p>
                    <p className="mt-4 font-medium text-black dark:text-white">
                      Topic: <span className="text-[#2662d9] dark:text-[#6b9eff]">{speaker.topic}</span>
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Desktop navigation buttons */}
          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-6" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}