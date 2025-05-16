import React, { CSSProperties, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  variant?: "container" | "in-n-out" | "lazy" | "border";
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.1em",
      shimmerDuration = "1.2s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      variant = "border",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        ref={ref}
        {...props}
      >
        {variant === "container" && (
          <div className="absolute inset-0 overflow-visible [container-type:size]">
            <div className="absolute left-0 top-0 h-[100cqh] aspect-square animate-shimmer-slide">
              <div 
                className="absolute -inset-full animate-spark-spin" 
                style={{
                  background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, ${shimmerColor} var(--spread), transparent var(--spread))`,
                  opacity: 0.7
                }}
              />
            </div>
          </div>
        )}

        {variant === "border" && (
          <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)]">
            {/* Border effect with no center line */}
            <div 
              className="absolute inset-[-2px] animate-border-spin"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${shimmerColor}, transparent 50%)`,
              }}
            />
            {/* Inner mask to hide the center */}
            <div 
              className="absolute inset-[1px] rounded-[calc(var(--radius)-1px)] bg-[var(--bg)] z-10"
            />
          </div>
        )}

        {variant === "in-n-out" && (
          <div className="absolute inset-0 overflow-visible [container-type:size]">
            <div className="absolute right-[100%] top-[50%] translate-y-[-50%] w-[200cqh] aspect-square animate-slide-across">
              <div className="absolute w-[500%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] [background:linear-gradient(180deg,transparent,var(--shimmer-color)_25%,transparent_30%)]" />
            </div>
          </div>
        )}

        {variant === "lazy" && (
          <div className="absolute inset-0 overflow-visible">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full aspect-square">
              <div className="absolute inset-0 animate-lazy-spin [background:conic-gradient(transparent,var(--shimmer-color)_60deg,transparent_61deg)]" />
            </div>
          </div>
        )}
        
        <div className="relative z-20">{children}</div>

        {/* Backdrop to ensure content is readable */}
        {variant !== "border" && (
          <div
            className={cn(
              "absolute z-[5] [background:var(--bg)] rounded-[calc(var(--radius)-2px)]",
              "[inset:var(--cut)]",
            )}
          />
        )}

        {/* Highlight effect */}
        <div
          className={cn(
            "absolute inset-0 z-10",
            "rounded-[var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
