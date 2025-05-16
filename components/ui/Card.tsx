import { cn } from "@/lib/utils";

interface CardProps {
  codeContent?: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
}

export function Card({ codeContent, className, gradientFrom = "#1e293b", gradientTo = "#0f172a", children }: CardProps) {
  return (
    <div 
      className={cn("p-4 rounded-lg w-full h-full  backdrop-blur-xl", className)} 
      
    >
      {children ? children : (
        codeContent && (
          <div className="font-mono text-sm">
            {codeContent}
          </div>
        )
      )}
    </div>
  );
} 