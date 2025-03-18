import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const games = [
    {
      title: "EquiNomics: Case Competition",
      description:
        "EquiNomics is a hybrid case study competition where participants must use their economics, business acumen and problem-solving skills to give practical solutions",
      image: "/game_2.jpg",
      link:"https://unstop.com/p/iqtisadiyyat25-iqtisadiyyat25-shiv-nadar-university-1430684",
      height:"20",
      width:"400"
    },
    {
      title: "State of the Nation: Mock Parliament",
      description:
        "The State of the Nation is a mock parliamentary debate where participants become Members of Parliament (MPs), suggest amendments and ultimately vote to determine the legislation.",
      image: "/game_1.png",
      link:"https://unstop.com/p/the-state-of-the-nation-iqtisadiyyat25-shiv-nadar-university-snu-greater-noida-1431220",
      height:"200",
      width:"400"
    }
  ]
  


  const foodItems = [
    {
      name: "Financial Frontlines",
      description: "A selection of dishes featuring ingredients from major trade routes throughout history.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Tax Me Please",
      description: "A spicy dish that gets progressively more intense, just like inflation!",
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
            4 Challenges, 1 Stage
          </h2>
          <p className="max-w-[700px] text-[#71717a] md:text-xl">
          Two thrilling on-the-spot games, two high-stakes qualifiers—test your skills against the sharpest minds. Open for all, exclusive for the best. Register now on Unstop!
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">Open Qualifiers</TabsTrigger>
            <TabsTrigger value="food">Offline Games</TabsTrigger>
          </TabsList>
          <TabsContent value="games" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game, index) => (
                <Link key={index} href={game.link}>
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      width = {game.width}
                      height={game.height}
                      className="object-cover pl-0 md:pl-8"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="mt-2 text-[#71717a]">{game.description}</p>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-[#71717a]">
              Open Qualifiers are free for all, but the Offline Competitions are exclusive to Iqtisadiyyat'25 ticket holders
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
            Open Qualifiers are free for all, but the Offline Competitions are exclusive to Iqtisadiyyat'25 ticket holders
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}