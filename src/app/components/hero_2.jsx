'use client'
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gray-400"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gray-300"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col md:flex-row items-center">
        {/* Left content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            IQTISADIYYAT
          </h1>
          <h2 className="text-2xl font-normal text-gray-800 mb-6 tracking-wide">
            Shiv Nadar University's Premier Economics Conclave
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join the brightest minds in economics for a transformative experience of debates, 
            workshops, and networking opportunities that will shape your understanding of 
            modern economic challenges.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-12">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2" />
              <span>March 15-16, 2025</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Shiv Nadar University</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-2" />
              <span>500+ Attendees</span>
            </div>
          </div>
          
          <button 
            className={`px-8 py-4 text-lg font-medium rounded-none transform transition-all duration-300 ${
              isHovered 
                ? "bg-black text-white" 
                : "bg-white text-black border-2 border-black"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            GET YOUR TICKETS
          </button>
          
          <p className="text-gray-500 mt-4 text-sm">
            Early bird tickets available until March 1st
          </p>
        </div>
        
        {/* Right content - Event highlights */}
        <div className="md:w-1/2 border border-gray-200 rounded-none p-8 text-black">
          <h3 className="text-2xl font-bold mb-6 border-b pb-4">Event Highlights</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="border border-gray-300 p-2 rounded-none mr-4">
                <Users className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold">Keynote Speakers</h4>
                <p className="text-gray-600">Leading economists and policymakers sharing insights</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="border border-gray-300 p-2 rounded-none mr-4">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold">Interactive Panels</h4>
                <p className="text-gray-600">Debate contemporary economic challenges with experts</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="border border-gray-300 p-2 rounded-none mr-4">
                <Users className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold">Networking Sessions</h4>
                <p className="text-gray-600">Connect with industry professionals and academics</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="border border-gray-300 p-2 rounded-none mr-4">
                <Users className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold">Exclusive Workshops</h4>
                <p className="text-gray-600">Hands-on sessions on economic analysis and forecasting</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Student Ticket:</span>
              <span className="font-bold">₹999</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Professional Ticket:</span>
              <span className="font-bold">₹1999</span>
            </div>
            <div className="mt-6">
              <button className="w-full py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors">
                VIEW ALL TICKET OPTIONS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;