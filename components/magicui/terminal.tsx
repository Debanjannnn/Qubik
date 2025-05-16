"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-sm font-normal tracking-tight", className)}
    {...props}
  >
    {children}
  </motion.div>
);

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  fileName?: string;
}

export const Terminal = ({ 
  children, 
  className, 
  gradientFrom = "#2A2A2A",
  gradientTo = "#1E1E1E",
  fileName = "app.js"
}: TerminalProps) => {
  // Split content by newlines to add line numbers
  const contentLines = children?.toString().split('\n') || [];
  
  return (
    <div
      className={cn(
        "relative z-0 h-full max-h-[500px] w-full rounded-xl bg-background",
        className,
      )}
      style={gradientFrom && gradientTo ? { backgroundImage: `radial-gradient(ellipse at top center, ${gradientFrom}, ${gradientTo})` } : {}}
    >
      {/* Editor header with tabs */}
      <div className="flex flex-col border-b border-gray-200 border-opacity-10">
        {/* Tab bar */}
        <div className="flex items-center px-2 py-1 bg-black/30">
          <div className="flex space-x-2 pl-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          
          {/* Filename tab */}
          <div className="ml-4 bg-gray-800/90 px-3 py-1 text-[10px] text-gray-300 rounded-t font-mono">
            {fileName}
          </div>
        </div>
        
        {/* Editor toolbar */}
        <div className="flex justify-between items-center px-3 py-1.5 bg-gray-800/60 text-[10px] text-gray-400 font-mono">
          <div>EXPLORER</div>
          <div className="flex space-x-3">
            <span>SEARCH</span>
            <span>GIT</span>
            <span>DEBUG</span>
          </div>
        </div>
      </div>
      
      {/* Editor content with line numbers */}
      <div className="flex h-[calc(100%-70px)] overflow-hidden">
        {/* Line numbers */}
        <div className="bg-gray-800/30 text-right pr-2 py-2 font-mono text-xs text-gray-500 border-r border-gray-700/30" style={{ minWidth: '2rem' }}>
          {contentLines.map((_, idx) => (
            <div key={idx} className="leading-5 px-2">{idx + 1}</div>
          ))}
        </div>
        
        {/* Code content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0">
          <pre className="p-2 w-full h-full font-mono text-xs whitespace-pre-wrap break-all">
            <code className="grid gap-y-0">{children}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
