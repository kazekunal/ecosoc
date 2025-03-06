'use client'
import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, TrendingUp, Award, BookOpen } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero section - 100vh height with mobile-only padding fix */}
      <div className="relative  w-full h-[90vh] bg-white overflow-hidden pt-24 sm:pt-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,50 T100,50" stroke="black" strokeWidth="0.5" fill="none" />
            <path d="M0,70 Q35,40 70,60 T100,30" stroke="black" strokeWidth="0.5" fill="none" />
            <path d="M0,30 Q45,80 80,20 T100,60" stroke="black" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        
        {/* <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.2" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-20 left-10 text-9xl font-thin opacity-10 text-gray-300">$</div>
        <div className="absolute top-40 right-20 text-9xl font-thin opacity-10 text-gray-300">€</div>
        <div className="absolute bottom-20 left-40 text-9xl font-thin opacity-10 text-gray-300">¥</div>
      </div> */}

        {/* Main content */}
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-6">
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s, transform 0.5s',
                  transitionDelay: '0.1s'
                }}
              >
                <div className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4 px-3 py-1 text-sm inline-block rounded-full">
                  April 5-6, 2025
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-2">IQTISADIYYAT</h1>

                <p className="text-xl md:text-2xl font-medium text-blue-800 mb-6">
                  Shaping the Future of Economic Thought
                </p>

                <p className="text-lg text-gray-700 max-w-2xl mb-8">
                  Join the Economics Society of Shiv Nadar University for a transformative three-day conclave featuring
                  world-renowned economists, policymakers, and thought leaders exploring today's most pressing economic
                  challenges.
                </p>
              </div>

              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s, transform 0.5s',
                  transitionDelay: '0.3s'
                }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2 text-blue-800" />
                  <span>April 5-6, 2025</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-2 text-blue-800" />
                  <span>G-Block, Shiv Nadar University</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 mr-2 text-blue-800" />
                  <span>500+ Attendees</span>
                </div>
              </div>

              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s, transform 0.5s',
                  transitionDelay: '0.5s'
                }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 text-lg font-medium rounded-md transition-all duration-300 hover:shadow-lg"
                  >
                    Buy Tickets Now
                  </button>
                  <button
                    className="border border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-3 text-lg font-medium rounded-md"
                  >
                    View Schedule
                  </button>
                </div>

                <p className="text-sm text-gray-500">Early bird tickets available until January 15, 2025</p>
              </div>
            </div>

            {/* Right content - Event highlights */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'opacity 0.7s, transform 0.7s',
                transitionDelay: '0.4s'
              }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="relative h-48 w-full">
                  <img
                    src="/shiv.jpg"
                    alt="Economics Conclave"
                    className="object-cover absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold">Event Highlights</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">18+ Distinguished Speakers</h4>
                      <p className="text-sm text-gray-600">Leading economists and policymakers from around the world</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Award className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Networking Opportunities</h4>
                      <p className="text-sm text-gray-600">
                        Connect with industry leaders and fellow economics enthusiasts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Interactive Workshops</h4>
                      <p className="text-sm text-gray-600">Hands-on sessions exploring economic models and theories</p>
                    </div>
                  </div>

                  <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md">
                    Reserve Your Spot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* <div className="py-16 bg-gray-50 opacity-0 translate-y-8l">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Featured Speakers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={`/api/placeholder/200/200`}
                    alt={`Featured Speaker ${i}`}
                    className="object-cover absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">Dr. Economist Name</h3>
                  <p className="text-sm text-gray-600">Professor of Economics, University Name</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-blue-800 text-blue-800 hover:bg-blue-50 py-2 px-4 rounded-md">
              View All Speakers
            </button>
          </div>
        </div>
      </div> */}

      {/* Countdown timer */}
      {/* <div className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-4">Event Starts In</h3>
            <div className="flex justify-center gap-4">
              <CountdownItem label="Days" value="125" />
              <CountdownItem label="Hours" value="08" />
              <CountdownItem label="Minutes" value="45" />
              <CountdownItem label="Seconds" value="30" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

const CountdownItem = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-blue-800 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
        {value}
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
};

export default HeroSection;

