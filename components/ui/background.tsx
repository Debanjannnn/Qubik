import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Particles } from "../magicui/particles";
import { useTheme } from "next-themes";


export function GridBackgroundDemo({ children }: { children: React.ReactNode }) {

    

  return (
    <div className="relative flex w-full items-center justify-center bg-black z-0">
          <Particles
        className="absolute inset-0 z-0"
        quantity={1000}
        ease={80}
       
        refresh
      />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#4a1523_1px,transparent_1px),linear-gradient(to_bottom,#4a1523_1px,transparent_1px)]",
        )}
      />
       
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"></div>
     
      {children}
    </div>
  );
}
