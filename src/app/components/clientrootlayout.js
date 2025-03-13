"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "../context/CartContext";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientRootLayout({ children }) {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (window.Razorpay) {
      console.log("Razorpay already loaded");
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully!");
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      console.error("❌ Razorpay script failed to load.");
    };

    document.body.appendChild(script);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {razorpayLoaded ? children : <p>Loading...</p>}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
