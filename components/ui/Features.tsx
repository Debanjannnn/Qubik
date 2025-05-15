import React from 'react';

import { useTheme } from 'next-themes';
import BentoGrid from './bento-grid';
import { SideGridBackground } from "@/components/ui/SideGridBackground";

export const Features = () => {
  const { theme } = useTheme()
  return (
    
    <div 
      className="py-10 w-full h-full px-4" 
      
    >
      <div className="max-w-6xl mx-auto">
          <BentoGrid />    
      </div>
    </div>
    
    
  );
}; 