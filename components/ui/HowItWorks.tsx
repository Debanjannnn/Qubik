"use client";
import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { ArrowRightLeft } from "lucide-react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AuroraText } from "../magicui/aurora-text";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  

  return (
    <section className="container mx-auto px-4 py-20 relative" ref={containerRef}>
      <motion.h1 
          className={cn("text-3xl md:text-4xl lg:text-5xl font-thin text-center mb-24", poppins.className)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <AuroraText colors={[ "#cc4368", "#e6295c", "#ffffff", "#E23E6B"]}>
            <span className="text-transparent">Everything You Need</span> 
            
          </AuroraText>
          <br />
          to Scale Your Product's Reach
        </motion.h1>
      
      <div className="relative">
        <div className="grid md:grid-cols-5 gap-8 relative">
          {/* Input Card - taking 2 columns */}
          <div className="md:col-span-2 flex justify-end">
            <div ref={inputRef} className="max-w-md">
              <NeonGradientCard 
                borderSize={4} 
                borderRadius={16}
                width="350px" 
                className="h-[300px]"
                neonColors={{
                  firstColor: "#E23E6B",
                  secondColor: "#85253f"
                }}
              >
                <Card 
                  gradientFrom="#1f2937"
                  gradientTo="#111827"
                  className="h-full w-full"
                />
              </NeonGradientCard>
            </div>
          </div>
          
          {/* Middle Column for Icon */}
          <div className="md:col-span-1 flex justify-center items-center">
            {/* This div is just for spacing */}
          </div>
          
          {/* Output Card - taking 2 columns */}
          <div className="md:col-span-2 flex justify-start">
            <div ref={outputRef} className="max-w-md">
              <NeonGradientCard 
                borderSize={3} 
                borderRadius={16}
                width="350px" 
                className="h-[300px]"
                neonColors={{
                  firstColor: "#E23E6B",
                  secondColor: "#85253f"
                }}
              >
                <Card 
                  gradientFrom="#1f2937"
                  gradientTo="#111827"
                  className="h-full w-full"
                />
              </NeonGradientCard>
            </div>
          </div>
        </div>
        
        {/* Circular Icon in the middle */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
          ref={iconRef}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-radial from-[#FDE2E4] to-[#E23E6B] flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.45 100.35" fill="currentColor" className="text-white h-8 w-8">
              <path d="M26.28,32.68A11.25,11.25,0,1,1,15,21.43,11.25,11.25,0,0,1,26.28,32.68Z"/>
              <path d="M51.45,32.68A11.25,11.25,0,1,1,40.18,21.43,11.25,11.25,0,0,1,51.45,32.68Z"/>
              <path d="M52.58,73.18V50.05a2.74,2.74,0,0,0-2.72-2.73H16.6a2.75,2.75,0,0,0-2.73,2.73V73.18H.55v9.3H13.87V93.73H24.7V82.48H41.75V93.73H52.58V82.48H65.9v-9.3Z"/>
              <rect x="0.55" y="0.5" width="65.38" height="17.8" rx="8.9"/>
            </svg>
          </div>
          <p className={cn("text-xs text-white mt-2", poppins.className)}>AI Agent</p>
        </div>
      </div>
      
      {/* Animated beams connecting through the icon */}
      {typeof window !== "undefined" && (
        <>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={inputRef}
            toRef={iconRef}
            curvature={0}
            pathColor="#334155"
            pathWidth={3}
            pathOpacity={0.3}
            gradientStartColor="#FFFFFF"
            gradientStopColor="#E23E6B"
            duration={8}
            delay={0}
            startXOffset={120}
            endXOffset={180}
          />
            
        </>
      )}
    </section>
  );
} 