import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";

const schedule = {
  day1: [
    {
      time: "12:00 - 12:30",
      title: "Registrations & Delegate Kits",
      description: "Check in and receive your delegate kits",
      location: "G-Block",
    },
    {
      time: "12:30 - 1:00",
      title: "Opening Ceremony",
      description: "Beginning with fresh ideas and inspiring voices!",
      location: "G-Block Auditorium",
    },
    {
      time: "1:00 - 2:00",
      title: "Keynote Session ",
      description: "Speakers take the stage to share ideas that challenge and inspire.",
      location: "G-Block Auditorium",
    },
    {
      time: "2:00 - 3:00",
      title: "Lunch & Networking",
      description: "An informal meal for attendees, panelists, and delegates to put your networking skills to work!",
      location: "G-Block hall",
    },
    {
      time: "3:00 - 4:00",
      title: "Industry Insights",
      description: "Session with Mr. Shraman Jha - CEO at Hindustan Unilever Foundation",
      location: "G-Block Auditorium",
    },
    {
      time: "4:00 - 5:30",
      title: "Skill Building/Corporate Workshop",
      description: "Get practical skills and career insights from top industry experts.",
      location: "G-Block Auditorium",
    },
    {
      time: "5:30 - 7:30",
      title: "Financial Frontlines & EquiNomics",
      description: "Where strategy meets numbers - Business Economics Case Competition",
      location: "G-Block Room",
    },
    {
      time: "8:00 pm onwards",
      title: "Jam and Karaoke Night",
      description: "Hit the High Note at the karaoke night!",
      location: "B-315",
    },
  ],
  day2: [
    {
      time: "11:00 - 1:00",
      title: "State of the Nation",
      description: "Mock Parliamentary Debate Competition",
      location: "SARC - First floor",
    },
    {
      time: "1:00 - 2:00",
      title: "Keynote Session",
      description: "Session by Dr. T.C.A. Anant - Former Chief Statistician of India",
      location: "G-Block Auditorium",
    },
    {
      time: "2:00 - 3:00",
      title: "Lunch & Networking",
      location: "G-Block Hall",
    },
    {
      time: "3:00 - 4:00",
      title: "Economic Insights",
      description: "Session with Dr. Abhishek Gupta - The Chief India Economist at Bloomberg",
      location: "G-Block Auditorium",
    },
    {
      time: "4:00 - 5:30",
      title: "India@100 Panel",
      description: "Three unique perspectives on India's journey to 100—growth, challenges, and what’s next.",
      location: "G-Block Auditorium",
    },
    {
      time: "5:30 - 7:00",
      title: "Tax Me Please!",
      description: "Exploit smartly, earn the most.",
      location: "G-Block Room",
    },
    {
      time: "8:00 pm onwards",
      title: "Pro Night",
      description: "Blow off the steam with a surprise guest!",
      location: "G-Block Auditorium",
    },
  ],
};
  

export default function Schedule() {
  return (
    <section id="schedule" className="w-full flex justify-center dark:bg-[#121212] bg-[#f4f4f4]/50 py-16 md:py-24">
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
            <TabsTrigger value="day1">Day 1 (April 5)</TabsTrigger>
            <TabsTrigger value="day2">Day 2 (April 6)</TabsTrigger>
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