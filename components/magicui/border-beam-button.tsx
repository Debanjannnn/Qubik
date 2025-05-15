"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ButtonProps } from "@/components/ui/button";
import { BorderBeam } from "./border-beam";
import { forwardRef } from "react";

interface BorderBeamButtonProps extends ButtonProps {
  /**
   * Whether to show the border beam effect.
   */
  showBeam?: boolean;
  /**
   * The color of the border beam from.
   */
  beamColorFrom?: string;
  /**
   * The color of the border beam to.
   */
  beamColorTo?: string;
  /**
   * The duration of the border beam animation.
   */
  beamDuration?: number;
  /**
   * The size of the border beam.
   */
  beamSize?: number;
  /**
   * Whether to reverse the animation direction.
   */
  beamReverse?: boolean;
}

export const BorderBeamButton = forwardRef<HTMLButtonElement, BorderBeamButtonProps>(
  (
    {
      className,
      children,
      variant = "outline",
      showBeam = true,
      beamColorFrom = "#ffaa40",
      beamColorTo = "#9c40ff",
      beamDuration = 6,
      beamSize = 60,
      beamReverse = false,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden border border-beam-button",
          variant === "outline" && "hover:text-white",
          className
        )}
        variant={variant}
        {...props}
      >
        {showBeam && (
          <BorderBeam
            colorFrom={beamColorFrom}
            colorTo={beamColorTo}
            duration={beamDuration}
            size={beamSize}
            reverse={beamReverse}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

BorderBeamButton.displayName = "BorderBeamButton"; 