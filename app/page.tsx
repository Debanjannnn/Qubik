"use client"
import { FloatingNav } from "@/components/ui/floating-navbar";
import Image from "next/image";
import { Home as IconHome, User as IconUser, MessageSquare as IconMessage } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import Aurora from "@/components/ui/Aurora";
import { Features } from "@/components/ui/Features";
import { HowItWorksV2 } from "@/components/ui/HowItWorksV2";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen  bg-black text-white overflow-x-hidden">
      
      <div className="absolute top-0 left-0 right-0 z-10 py-4">
        <FloatingNav navItems={navItems}/>
      </div>
      
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Code Example Section */}
      <HowItWorksV2 />

      {/* CTA Section */}
      <Footer />

      {/* Standalone bottom text */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-sm text-gray-400 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <p>All systems operational</p>
        </div>
        <div>
          <p>© {currentYear} Paper-Plane. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
