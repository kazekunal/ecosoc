import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";

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
  

export default function Schedule() {
  return (
    <section id="schedule" className="w-full flex justify-center bg-muted/50 py-16 md:py-24">
      <div className="mx-auto px-4 container space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-[#2662d9]/10 px-3 py-1 text-sm text-[#2662d9]">
            Event Schedule
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Two Days of Economic Exploration
          </h2>
          <p className="max-w-[700px] text-[#71717a] md:text-xl">
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
                    <div className="md:w-1/5 font-mono text-[#2662d9] font-bold">
                      {item.time}
                    </div>
                    <div className="md:w-4/5">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-[#71717a]">{item.description}</p>
                      {item.speaker && (
                        <p className="mt-2 font-medium">
                          Speaker:{" "}
                          <span className="text-[#2662d9]">{item.speaker}</span>
                        </p>
                      )}
                      {item.location && (
                        <div className="mt-2 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-[#2662d9]" />
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
                    <div className="md:w-1/5 font-mono text-[#2662d9] font-bold">
                      {item.time}
                    </div>
                    <div className="md:w-4/5">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-[#71717a]">{item.description}</p>
                      {item.speaker && (
                        <p className="mt-2 font-medium">
                          Speaker:{" "}
                          <span className="text-[#2662d9]">{item.speaker}</span>
                        </p>
                      )}
                      {item.location && (
                        <div className="mt-2 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-[#2662d9]" />
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
  );
}