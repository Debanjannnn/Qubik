"use client";
import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AuroraText } from "../magicui/aurora-text";
import { Poppins } from "next/font/google";
import { CodeEditor } from "@/components/ui/CodeEditor";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { GradientHeading } from "./gradient-heading";
import { ShimmerButton } from "../magicui/shimmer-button";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export function HowItWorksV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Sample code for the snippet
  const snippetCode = `use anchor_lang::prelude::*;

declare_id!("FILL_THIS_WITH_YOUR_PROGRAM_ID");

#[program]
pub mod account_demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, new_data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = new_data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)] // 8 bytes for discriminator, 8 for u64
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}
anchor`;

  return (
    <section className="container mx-auto px-4 py-10 relative" ref={containerRef}>
      <motion.h1 
          className={cn("text-2xl md:text-3xl lg:text-5xl font-thin text-center mb-12", poppins.className)}
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
      
      {/* Streamlined Development Card - now as a separate entity */}
      <div className="absolute z-20 right-24 top-[calc(16rem)] md:w-1/4 w-[calc(100%-2rem)] text-center">
        <Card 
          className={cn(
            "mt-2 p-3 rounded-lg",
            // "bg-gradient-to-br from-slate-800 to-slate-900" 
          )}
        >
          <div className="relative z-20 py-2">
            {/* Header and subheading */}
            <GradientHeading
              variant="light"
              size="xl"
              weight="thin"
              className={`${poppins.className}`}
            >
              Typescript to Anchor in seconds 
            </GradientHeading>
            <GradientHeading
              variant="secondary"
              size="xxs"
              weight="thin"
              className={`${poppins.className} mb-4`}
            >
              From concept to deployment in three simple steps
            </GradientHeading>
            
            <div className="flex justify-center">
              <ShimmerButton 
                shimmerColor="rgba(226, 62, 107, 0.9)"
                background="rgba(20, 20, 20, 0.9)"
                shimmerDuration="1s"
                borderRadius="32px"
                shimmerSize="0.1em"
                variant="container"
                className="text-base font-medium px-12 py-3"
              >
                Try Now
              </ShimmerButton>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="relative flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center">
        {/* Code Editor Container */}
        <div className="flex justify-center md:justify-start w-full md:w-3/4 lg:w-3/4 mb-4 md:mb-0 md:pl-0">
          <div ref={inputRef} className="ml-6 w-[80%] h-[400px] relative">
            {/* Main Code Editor with Snippet protruding from it */}
            <Card 
                gradientFrom="#1f2937"
                gradientTo="#111827"
                className="h-full w-full p-0 overflow-hidden relative"
            >
              <div 
                className="absolute inset-0 z-30 pointer-events-none" 
                style={{
                  boxShadow: "inset 0 0 100px 40px #000000",
                  borderRadius: "0.75rem"
                }}
              />

              <div className="relative z-20 h-full w-full">
                <CodeEditor />
              </div>
            </Card>
            
            {/* CodeSnippet Card - positioned as overlay on the editor */}
            <div 
              className="absolute top-[225px] left-[400px] w-[550px] h-[350px] z-50"
              style={{
                transform: "perspective(800px) translate3d(0, 0, 40px) rotateX(5deg)",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 15px 30px, rgba(0, 0, 0, 0.25) 0px 10px 10px, rgba(0, 0, 0, 0.4) 0px -3px 10px -3px inset",
                transition: "all 0.3s ease-out"
              }}
            >
              <Card 
                  gradientFrom="#16213e"
                  gradientTo="#0f172a"
                  className="h-full w-full p-0 overflow-hidden relative rounded-md border border-[#1a3363]/30"
              >
                <div 
                  className="absolute inset-0 z-30 pointer-events-none" 
                  style={{
                    boxShadow: "inset 0 0 40px 15px #000000",
                    borderRadius: "0.375rem"
                  }}
                />
                
                <div className="relative z-20 h-full w-full">
                  <CodeSnippet 
                    code={snippetCode}
                    language="rust"
                    filename="anchor.rs"
                    maxHeight="250px"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
} 