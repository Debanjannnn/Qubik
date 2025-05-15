"use client"

import React, { useEffect, useState } from 'react';
import { color, motion } from 'framer-motion';
import { GradientHeading } from './gradient-heading';
import { Poppins } from 'next/font/google';
import RotatingText from './Rotating-text';
import { GridBackgroundDemo } from './background';
import { Globe } from '../magicui/globe';
import { NeonGradientCard } from '../magicui/neon-gradient-card';
import { Particles } from '../magicui/particles';
import { useTheme } from "next-themes";
import { ScriptCopyBtn } from '../magicui/script-copy-btn';
import { BorderBeam } from '../magicui/border-beam';
import { AnimatedShinyText } from '../magicui/animated-shiny-text';
import { cn } from '@/lib/utils';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const Hero = () => {
  const customCommandMap = {
    npm: "npm install qubik",
    yarn: "yarn add qubik",
    pnpm: "pnpm dlx qubik",
    bun: "bun x add qubik",
  };

  return (
    <GridBackgroundDemo>
    <section className="min-h-screen w-full flex flex-col z-10 items-center justify-center px-4 text-center">
    <div className='pb-6'>
    <div
        className={cn(
          "group rounded-full border border-black/5 bg-gradient-to-r from-black via-gray-900 to-black text-sm max-w-xs transition-all ease-in hover:cursor-pointer hover:bg-neutral-200/10 dark:border-white/5 dark:hover:bg-neutral-800/50 shadow-[0_0_12px_rgba(226,62,107,0.5)] hover:shadow-[0_0_24px_rgba(226,62,107,0.8)] hover:translate-y-[-2px] transform-gpu",
        )}
      >
        <AnimatedShinyText 
          useCustomGradient={true}
          className="inline-flex items-center justify-center px-4 py-1 transition ease-out bg-gradient-to-t from-white to-[#E23E6B] bg-clip-text animate-shiny-text"
        >
          <div className="relative h-2 w-2 mr-4 flex items-center justify-center">
            <div className="absolute h-4 w-4 rounded-full bg-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.2)] animate-pulse"></div>
            <div className="absolute h-3 w-3 rounded-full bg-green-500/40 shadow-[0_0_8px_rgba(74,222,128,0.4)] animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
          </div>
          <span className={cn(
                "relative ",
                poppins.className
              )}>Still Cooking , Stay Tuned !</span>
          
        </AnimatedShinyText>
      </div>
      </div>
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            variant="light"
            size="xxl"
            weight="thin"
            className={`${poppins.className}`}
          >
            Write Your Vision <motion.span 
              className="inline-block transform text-transparent bg-clip-text bg-gradient-to-t from-white to-[#E23E6B]"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {"!"}
            </motion.span>
          </GradientHeading>
        </motion.div>
        <div className="pb-4">
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GradientHeading
            variant="light"
            size="xl"
            weight="thin"
            className={`${poppins.className}`}
          >
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-white to-[#E23E6B]"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {"<"}
            </motion.span> Seamlessly Deploy <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-white to-[#E23E6B]"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {"/>"}
            </motion.span>
          </GradientHeading>
        </motion.div>
      </div>
      <motion.p 
        className="text-xl md:text-2xl text-gray-300 mt-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Making Solana development as simple as writing a .qube file
      </motion.p>
      <motion.div 
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        
        <ScriptCopyBtn
      showMultiplePackageOptions={true}
      codeLanguage="shell"
      lightTheme="vitesse-dark"
      darkTheme="vitesse-dark"
      commandMap={customCommandMap}
    ><BorderBeam/></ScriptCopyBtn>
        
      </motion.div>
      
    </section>
    
    </GridBackgroundDemo>
  );
}; 