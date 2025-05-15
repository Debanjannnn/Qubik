"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: any;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    if (index === hoveredIndex) {
      return 1.2; // Scale up the hovered item
    }
    
    return 1; // Keep other items at normal size
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
        className={cn(
          "flex max-w-4xl mx-auto border border-gray-800 backdrop-blur-md dark:border-white/[0.2] rounded-3xl bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-4 items-center justify-between space-x-8 relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-white before:to-[#E23E6B] before:opacity-30 before:-z-10 before:blur-2xl before:translate-y-2",
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-[#E23E6B]" />
          <span className={cn("text-xl font-semibold text-white", poppins.className)}>Qubik</span>
        </div>

        <div className="flex items-center space-x-6">
          {navItems.map((navItem: any, idx: number) => (
            <motion.a
              key={`link=${idx}`}
              href={navItem.link}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                scale: getScale(idx),
                y: hoveredIndex === idx ? -2 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                mass: 0.5,
              }}
              className={cn(
                "relative text-white items-center flex space-x-1 hover:text-[#E23E6B] transition-colors",
                poppins.className
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </motion.a>
          ))}
        </div>

        
        <InteractiveHoverButton>
          Try Demo
        </InteractiveHoverButton>
      </motion.div>
    </AnimatePresence>
  );
};
