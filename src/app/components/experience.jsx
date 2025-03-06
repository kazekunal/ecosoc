import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const games = [
    {
      title: "Market Simulation",
      description:
        "Experience real-time market dynamics through an interactive trading simulation that demonstrates supply and demand principles.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Policy Maker",
      description:
        "Step into the shoes of a central banker and make monetary policy decisions to stabilize a simulated economy.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Trade Wars",
      description:
        "Navigate international trade negotiations and experience the impact of tariffs, subsidies, and trade agreements.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Behavioral Economics Lab",
      description:
        "Participate in experiments that reveal cognitive biases and their impact on economic decision-making.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]
  


  const foodItems = [
    {
      name: "Global Trade Platter",
      description: "A selection of dishes featuring ingredients from major trade routes throughout history.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Inflation Hot Pot",
      description: "A spicy dish that gets progressively more intense, just like inflation!",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Supply & Demand Sushi",
      description: "Limited availability sushi that changes price based on remaining quantity.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "GDP Growth Greens",
      description: "A sustainable salad featuring locally sourced ingredients that support economic growth.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Fiscal Policy Fusion",
      description: "A balanced blend of flavors representing different economic schools of thought.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Keynesian Dessert",
      description: "A sweet treat that demonstrates the multiplier effect with layers of flavor.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

export default function Experience() {
  return (
    <section id="experience" className="w-full flex justify-center py-16 md:py-24">
      <div className="mx-auto px-4 container space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 px-3 py-1 text-sm text-[#2662d9]">
            The IQTISADIYYAT Experience
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            More Than Just Lectures
          </h2>
          <p className="max-w-[700px] text-[#71717a] md:text-xl">
            Immerse yourself in a holistic learning environment with interactive
            games and gourmet food.
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">Interactive Games</TabsTrigger>
            <TabsTrigger value="food">Culinary Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="games" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="mt-2 text-[#71717a]">{game.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-[#71717a]">
                All games are designed to enhance your understanding of economic
                principles in a fun, interactive way.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="food" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {foodItems.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-[#71717a]">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-[#71717a]">
                Our carefully curated menu features dishes inspired by economic
                concepts and global trade routes.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}