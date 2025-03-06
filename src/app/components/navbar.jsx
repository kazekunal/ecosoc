"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, Ticket, User, Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only show theme toggle after component has mounted (to avoid hydration mismatch)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getBackdropClass = () => {
    return theme === "dark" ? "bg-zinc-900/95" : "bg-white/95";
  };

  return (
    <>
      <div className={`sticky top-0 z-50 w-full ${getBackdropClass()} backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
        <div className="border-b">
          <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">

            {/* Mobile Theme Toggle (Outside Dropdown) */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="md:hidden">
              {mounted && (
                <>
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Centered Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">IQTISADIYYAT</span>
            </Link>

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

            {/* Right side icons */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Theme Toggle Button - replaces Calendar */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
                {mounted && (
                  <>
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </>
                )}
                <span className="sr-only">Toggle theme</span>
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
          <div className={`${theme === "dark" ? "bg-zinc-900" : "bg-white"} text-${theme === "dark" ? "white" : "black"} shadow-lg rounded-b-lg max-h-[calc(100vh-4rem)] overflow-y-auto`}>
            <nav className="flex flex-col py-4">
              <Link
                href="/"
                className={`px-4 py-3 text-sm hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/About"
                className={`px-4 py-3 text-sm hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/schedule"
                className={`px-4 py-3 text-sm hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                href="/Speakers"
                className={`px-4 py-3 text-sm hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers
              </Link>
              
              {/* Bottom Icons Section */}
              <div className={`flex justify-around items-center border-t border-${theme === "dark" ? "zinc-700" : "gray-200"} mt-4 pt-4`}>
                <Link 
                  href="/tickets" 
                  className={`flex flex-col items-center hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"} p-2 rounded-lg`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket color="red" className="h-5 w-5 mb-1 fill" />
                  <span className="text-xs">Tickets</span>
                </Link>
                <Link 
                  href="/venues" 
                  className={`flex flex-col items-center hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"} p-2 rounded-lg`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="h-5 w-5 mb-1" />
                  <span className="text-xs">Venues</span>
                </Link>
                <Link 
                  href="/account" 
                  className={`flex flex-col items-center hover:${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"} p-2 rounded-lg`}
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