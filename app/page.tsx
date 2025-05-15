"use client"
import { FloatingNav } from "@/components/ui/floating-navbar";
import Image from "next/image";
import { Home as IconHome, User as IconUser, MessageSquare as IconMessage } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import Aurora from "@/components/ui/Aurora";
import { Features } from "@/components/ui/Features";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

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

  return (
    <div className="min-h-screen  bg-black text-white overflow-x-hidden">
      
      <div className="absolute top-0 left-0 right-0 z-10 py-4">
        <FloatingNav navItems={navItems}/>
      </div>
      
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Code Example Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Input (.cube file)</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code>{`cube
account user {
  mut,
  signer: "ownself",
  recipient,
  size: 100
}`}</code>
            </pre>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Output (Anchor Rust)</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code>{`#[account]
pub struct User {
    pub count: u64,
    pub amount: u64,
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Solana Development?</h2>
        <p className="text-gray-400 mb-8">Join the growing community of developers building on Solana with CUBE</p>
        <button className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Start Building Now
        </button>
      </section>
    </div>
  );
}
