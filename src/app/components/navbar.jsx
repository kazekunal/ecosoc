"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, MapPin, Ticket, User, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="border-b">
          <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
            {/* Left Side Links */}
            <nav className="hidden md:flex md:gap-6 lg:gap-10">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/schedule" className="text-sm font-medium transition-colors hover:text-primary">
                Schedule
              </Link>
              <Link href="/speakers" className="text-sm font-medium transition-colors hover:text-primary">
                Speakers
              </Link>
            </nav>

            {/* Centered Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">IQTISADIYYAT</span>
            </Link>

            {/* Right side icons */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Event Calendar */}
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link href="/calendar">
                  <Calendar className="h-5 w-5" />
                  <span className="sr-only">Event Calendar</span>
                </Link>
              </Button>

              {/* Venue Map */}
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link href="/venues">
                  <MapPin className="h-5 w-5" />
                  <span className="sr-only">Venue Map</span>
                </Link>
              </Button>

              {/* Tickets */}
              <Button variant="ghost" size="icon" asChild className="relative hidden md:flex">
                <Link href="/tickets">
                  <Ticket color="red" className="h-5 w-5 fill" />
                  <Badge
                    variant="secondary"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  >
                    0
                  </Badge>
                  <span className="sr-only">Tickets</span>
                </Link>
              </Button>

              {/* Account */}
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="fixed top-16 right-0 z-50 w-full md:hidden">
          <div className="bg-white shadow-lg rounded-b-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col py-4">
              <Link
                href="/"
                className="px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/About"
                className="px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/schedule"
                className="px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                href="/Speakers"
                className="px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers
              </Link>
              
              {/* Bottom Icons Section */}
              <div className="flex justify-around items-center border-t mt-4 pt-4">
                <Link 
                  href="/tickets" 
                  className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket color="red" className="h-5 w-5 mb-1 fill" />
                  <span className="text-xs">Tickets</span>
                </Link>
                <Link 
                  href="/calendar" 
                  className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Calendar</span>
                </Link>
                <Link 
                  href="/venues" 
                  className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="h-5 w-5 mb-1" />
                  <span className="text-xs">Venues</span>
                </Link>
                <Link 
                  href="/account" 
                  className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs">Account</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}