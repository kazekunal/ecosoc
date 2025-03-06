import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-xl font-extrabold tracking-tighter text-primary">IQTISADIYYAT</span>
            <span className="text-sm font-medium">by The Economics Society</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#speakers" className="text-sm font-medium hover:text-primary">
              Speakers
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-primary">
              Experience
            </Link>
            <Link href="#schedule" className="text-sm font-medium hover:text-primary">
              Schedule
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="#tickets">Buy Tickets</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="container py-24 md:py-32 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Shiv Nadar University Presents
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                IQTISADIYYAT <span className="text-primary">2024</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                The premier economics conclave that brings together thought leaders, interactive learning, and a
                culinary experience like no other.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>April 15-16, 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Shiv Nadar University, Greater Noida</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" asChild className="text-lg">
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

        <section id="speakers" className="bg-muted/50 py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Distinguished Speakers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Learn from the Best Minds in Economics
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our carefully curated lineup of speakers brings diverse perspectives and cutting-edge insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((speaker, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-[4/3] relative">
                    <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{speaker.name}</h3>
                    <p className="text-primary font-medium">{speaker.title}</p>
                    <p className="mt-2 text-muted-foreground">{speaker.bio}</p>
                    <p className="mt-4 font-medium">
                      Topic: <span className="text-primary">{speaker.topic}</span>
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

        <section id="experience" className="py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                The IQTISADIYYAT Experience
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">More Than Just Lectures</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Immerse yourself in a holistic learning environment with interactive games and gourmet food.
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
                        <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{game.title}</h3>
                        <p className="mt-2 text-muted-foreground">{game.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    All games are designed to enhance your understanding of economic principles in a fun, interactive
                    way.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="food" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {foodItems.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    Our carefully curated menu features dishes inspired by economic concepts and global trade routes.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="schedule" className="bg-muted/50 py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Event Schedule</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Two Days of Economic Exploration
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Plan your IQTISADIYYAT experience with our comprehensive schedule.
              </p>
            </div>

            <Tabs defaultValue="day1" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="day1">Day 1 (April 15)</TabsTrigger>
                <TabsTrigger value="day2">Day 2 (April 16)</TabsTrigger>
              </TabsList>
              <TabsContent value="day1" className="pt-6 space-y-4">
                {schedule.day1.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="md:w-1/5 font-mono text-primary font-bold">{item.time}</div>
                        <div className="md:w-4/5">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                          {item.speaker && (
                            <p className="mt-2 font-medium">
                              Speaker: <span className="text-primary">{item.speaker}</span>
                            </p>
                          )}
                          {item.location && (
                            <div className="mt-2 flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1 text-primary" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="day2" className="pt-6 space-y-4">
                {schedule.day2.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="md:w-1/5 font-mono text-primary font-bold">{item.time}</div>
                        <div className="md:w-4/5">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                          {item.speaker && (
                            <p className="mt-2 font-medium">
                              Speaker: <span className="text-primary">{item.speaker}</span>
                            </p>
                          )}
                          {item.location && (
                            <div className="mt-2 flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1 text-primary" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="tickets" className="py-16 md:py-24 relative overflow-hidden">
          <div className="container relative z-10 space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Limited Tickets Available
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Secure Your Spot Today</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Don't miss this opportunity to be part of IQTISADIYYAT 2024.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tickets.map((ticket, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden ${ticket.featured ? "border-primary shadow-lg ring-2 ring-primary" : ""}`}
                >
                  {ticket.featured && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 pt-8 text-center">
                    <h3 className="text-2xl font-bold">{ticket.name}</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold">₹{ticket.price}</span>
                      <span className="ml-1 text-muted-foreground">/person</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-left">
                      {ticket.features.map((feature, i) => (
                        <li key={i} className="flex">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-8 w-full" size="lg" variant={ticket.featured ? "default" : "outline"} asChild>
                      <Link href="/payment">Buy Ticket</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Group discounts available for 5+ tickets.{" "}
                <Link href="#" className="text-primary underline">
                  Contact us
                </Link>{" "}
                for details.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </section>

        <section id="faq" className="bg-muted/50 py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Got Questions? We've Got Answers
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to know about IQTISADIYYAT 2024.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold">{faq.question}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Still have questions?{" "}
                <Link href="#" className="text-primary underline">
                  Contact our team
                </Link>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Expand Your Economic Horizons?
            </h2>
            <p className="max-w-[700px] mx-auto md:text-xl">
              Join us at IQTISADIYYAT 2024 for an unforgettable experience that will transform your understanding of
              economics.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link href="#tickets">
                Buy Your Ticket Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="font-bold text-xl">IQTISADIYYAT</div>
              <p className="text-sm text-muted-foreground">
                The premier economics conclave by The Economics Society of Shiv Nadar University.
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-bold">Quick Links</div>
              <ul className="space-y-2">
                <li>
                  <Link href="#speakers" className="text-sm hover:text-primary">
                    Speakers
                  </Link>
                </li>
                <li>
                  <Link href="#experience" className="text-sm hover:text-primary">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="#schedule" className="text-sm hover:text-primary">
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link href="#tickets" className="text-sm hover:text-primary">
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-bold">Contact</div>
              <ul className="space-y-2">
                <li className="text-sm">economics.society@snu.edu.in</li>
                <li className="text-sm">+91 123 456 7890</li>
                <li className="text-sm">Shiv Nadar University, Greater Noida</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-bold">Follow Us</div>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 IQTISADIYYAT. All rights reserved. The Economics Society, Shiv Nadar University.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
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

const schedule = {
  day1: [
    {
      time: "09:00 - 10:00",
      title: "Registration & Welcome Breakfast",
      description: "Check-in and enjoy a networking breakfast with fellow attendees.",
      location: "Main Hall",
    },
    {
      time: "10:00 - 11:30",
      title: "Opening Keynote",
      description: "The Future of Economic Policy in a Changing World",
      speaker: "Dr. Raghuram Rajan",
      location: "Auditorium",
    },
    {
      time: "11:45 - 13:00",
      title: "Panel Discussion",
      description: "Navigating Economic Uncertainty: Strategies for Businesses and Individuals",
      location: "Conference Room A",
    },
    {
      time: "13:00 - 14:00",
      title: "Lunch & Networking",
      description: "Experience our Global Trade Platter and connect with speakers and attendees.",
      location: "Dining Hall",
    },
    {
      time: "14:15 - 15:30",
      title: "Interactive Workshop",
      description: "Market Simulation: Understanding Supply and Demand Dynamics",
      location: "Workshop Room 1",
    },
    {
      time: "15:45 - 17:00",
      title: "Keynote Address",
      description: "Experimental Approaches to Alleviating Global Poverty",
      speaker: "Dr. Abhijit Banerjee",
      location: "Auditorium",
    },
    {
      time: "17:15 - 18:30",
      title: "Economics Game Night",
      description: "Participate in fun, interactive games that teach economic principles.",
      location: "Main Hall",
    },
  ],
  day2: [
    {
      time: "09:30 - 10:30",
      title: "Breakfast & Recap",
      description: "Morning refreshments and a recap of Day 1 highlights.",
      location: "Main Hall",
    },
    {
      time: "10:30 - 12:00",
      title: "Keynote Address",
      description: "Global Economic Outlook Post-Pandemic",
      speaker: "Dr. Gita Gopinath",
      location: "Auditorium",
    },
    {
      time: "12:15 - 13:30",
      title: "Breakout Sessions",
      description: "Choose from specialized tracks on monetary policy, development economics, or behavioral economics.",
      location: "Various Rooms",
    },
    {
      time: "13:30 - 14:30",
      title: "Lunch & Networking",
      description: "Enjoy our Fiscal Policy Fusion menu while networking with peers.",
      location: "Dining Hall",
    },
    {
      time: "14:45 - 16:00",
      title: "Student Research Showcase",
      description: "Promising economics students present their research findings and innovative ideas.",
      location: "Conference Room B",
    },
    {
      time: "16:15 - 17:30",
      title: "Panel Discussion",
      description: "The Role of Economics in Addressing Climate Change and Sustainability",
      location: "Auditorium",
    },
    {
      time: "17:45 - 19:00",
      title: "Closing Ceremony & Networking Reception",
      description: "Final remarks, awards presentation, and farewell reception.",
      location: "Main Hall",
    },
  ],
}

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

const faqs = [
  {
    question: "When and where is IQTISADIYYAT taking place?",
    answer: "IQTISADIYYAT 2024 will be held on April 15-16, 2024, at Shiv Nadar University, Greater Noida.",
  },
  {
    question: "Are student discounts available?",
    answer: "Yes, we offer special student pricing. The Student Pass is available at a discounted rate of ₹999.",
  },
  {
    question: "Can I get a refund if I'm unable to attend?",
    answer:
      "Tickets are refundable up to 14 days before the event. After that, you can transfer your ticket to someone else.",
  },
  {
    question: "Will the sessions be recorded?",
    answer:
      "Yes, all keynote sessions will be recorded. Professional Pass holders will receive access to all recordings post-event.",
  },
  {
    question: "Is accommodation provided?",
    answer:
      "Accommodation is not included in the ticket price. However, we have partnered with nearby hotels to offer discounted rates.",
  },
  {
    question: "What COVID-19 precautions are in place?",
    answer:
      "We follow all current health guidelines. Attendees may be required to show vaccination certificates or negative test results.",
  },
]

