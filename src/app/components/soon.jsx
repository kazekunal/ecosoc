import React from 'react';
import { Calendar, Star, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function SpeakersRevealSoon() {
  

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

      {/* Main card (foreground) */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/30 p-8 md:p-12 overflow-hidden">
          {/* Sparkle effect in top corner */}
          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-yellow-300 animate-pulse" />
          
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-blue-600/80 p-3 rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                Inspiring Speakers Coming Soon!
            </h1>
            
            <p className="text-blue-100 text-lg max-w-md mx-auto">
              Our lineup of industry leaders and visionaries is being finalized. Check back soon for announcements!
            </p>
            
            {/* <div className="pt-6 flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">Coming 2025</span>
            </div> */}
            
            <div className="pt-4">
                <Link href="/">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 flex items-center mx-auto">
                <Star className="h-4 w-4 mr-2" />
                Back to Home page
              </button></Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Light orbs/glow effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>
  );
}