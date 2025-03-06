import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const speakers = [
    {
      name: "Dr. Raghuram Rajan",
      title: "Former Governor, Reserve Bank of India",
      bio: "Renowned economist with expertise in international finance and banking systems.",
      topic: "Future of Banking in Emerging Economies",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Dr. Abhijit Banerjee",
      title: "Nobel Laureate in Economics",
      bio: "Pioneer in development economics and poverty alleviation strategies.",
      topic: "Experimental Approaches to Alleviating Global Poverty",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Dr. Gita Gopinath",
      title: "Chief Economist, International Monetary Fund",
      bio: "Expert in international finance, monetary policy, and global trade.",
      topic: "Global Economic Outlook Post-Pandemic",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]
  
export default function Speakers() {
  return (
    <section id="speakers" className="w-full flex justify-center bg-[#f4f4f5]/50 py-16 md:py-24">
      <div className="mx-auto px-4 container space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 px-3 py-1 text-sm text-[#2662d9]">
            Distinguished Speakers
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Learn from the Best Minds in Economics
          </h2>
          <p className="max-w-[700px] text-[#71717a] md:text-xl">
            Our carefully curated lineup of speakers brings diverse perspectives
            and cutting-edge insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{speaker.name}</h3>
                <p className="text-[#2662d9] font-medium">{speaker.title}</p>
                <p className="mt-2 text-[#71717a]">{speaker.bio}</p>
                <p className="mt-4 font-medium">
                  Topic: <span className="text-[#2662d9]">{speaker.topic}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-8">
          <Button variant="outline" size="lg">
            View All Speakers
          </Button>
        </div>
      </div>
    </section>
  );
}
