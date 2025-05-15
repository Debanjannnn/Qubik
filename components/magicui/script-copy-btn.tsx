"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";
import { BorderBeamButton } from "./border-beam-button";
import { BorderBeam } from "./border-beam";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show multiple package manager options.
   */
  showMultiplePackageOptions?: boolean;
  /**
   * The language of the code being displayed.
   */
  codeLanguage: string;
  /**
   * The light theme for syntax highlighting.
   */
  lightTheme?: string;
  /**
   * The dark theme for syntax highlighting.
   */
  darkTheme?: string;
  /**
   * Map of package manager names to their install commands.
   */
  commandMap: Record<string, string>;
  /**
   * Optional class name for the container.
   */
  className?: string;
  /**
   * Whether to show the border beam effect on the copy button.
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
   * Whether to show the border beam effect on the script area.
   */
  showScriptBeam?: boolean;
  /**
   * The color of the script border beam from.
   */
  scriptBeamColorFrom?: string;
  /**
   * The color of the script border beam to.
   */
  scriptBeamColorTo?: string;
  /**
   * The duration of the script border beam animation.
   */
  scriptBeamDuration?: number;
  /**
   * The size of the script border beam.
   */
  scriptBeamSize?: number;
  /**
   * Whether to reverse the script beam animation direction.
   */
  scriptBeamReverse?: boolean;
  /**
   * Whether to show underline indicator for selected package.
   */
  showTabIndicator?: boolean;
  /**
   * Whether to use custom styling for highlighted code.
   */
  useCustomHighlighting?: boolean;
}

export function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  lightTheme = "vitesse-light",
  darkTheme = "vitesse-dark",
  commandMap = {
    npm: "npm install qubik",
    yarn: "yarn add qubik",
    pnpm: "pnpm dlx qubik",
    bun: "bun x add qubik",
  },
  className,
  showBeam = true,
  beamColorFrom = "#E23E6B",
  beamColorTo = "#E23E6B",
  beamDuration = 6,
  showScriptBeam = true,
  scriptBeamColorFrom = "#5EEAD4",
  scriptBeamColorTo = "#8B5CF6",
  scriptBeamDuration = 8,
  scriptBeamSize = 70,
  scriptBeamReverse = true,
  showTabIndicator = false,
  useCustomHighlighting = true,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const { theme } = useTheme();
  const command = commandMap[packageManager];

  // Custom render for the command with highlighted text
  const renderStyledCommand = () => {
    const parts = command.split(' ');
    if (parts.length >= 2) {
      const packageName = parts[parts.length - 1];
      const prefix = parts.slice(0, parts.length - 1).join(' ');
      return (
        <>
          <span className="text-white">{prefix} </span>
          <span className="text-[#E23E6B]">{packageName}</span>
        </>
      );
    }
    return command;
  };

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        // We'll skip Shiki highlighting for this specific use case
        setHighlightedCode("");
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode("");
      }
    }

    loadHighlightedCode();
  }, [command, theme, codeLanguage, lightTheme, darkTheme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "mx-auto flex max-w-md items-center justify-center",
        className,
      )}
    >
      <div className="w-full space-y-2">
        <div className="mb-2 flex items-center px-16">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="inline-flex overflow-hidden rounded-xl text-xs">
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center">
                    {index > 0 && (
                      <div className="h-4 w-px bg-border" aria-hidden="true" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`relative rounded-none bg-transparent backdrop-blur-sm px-2 py-1 hover:bg-background ${
                        packageManager === pm
                          ? "text-[#E23E6B] font-medium"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && showTabIndicator && (
                        <motion.div
                          className="absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] bg-primary"
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <div className="min-w-[300px] grow font-mono">
            <div className="relative rounded-md overflow-hidden backdrop-blur-sm bg-gray-950/80 border border-gray-800/50">
              <pre className="relative z-10 rounded-md bg-black/80 backdrop-blur-sm p-2 px-4 font-mono text-base">
                {renderStyledCommand()}
              </pre>
            </div>
          </div>
          <div className="copy-button-wrapper">
            <BorderBeamButton
              variant="outline"
              size="icon"
              className="ml-2 rounded-md bg-black border-gray-800 hover:bg-black copy-button"
              onClick={copyToClipboard}
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              showBeam={showBeam}
              beamColorFrom={beamColorFrom}
              beamColorTo={beamColorTo}
              beamDuration={beamDuration}
              beamSize={48}
            >
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              <Copy
                className={`h-4 w-4 transition-all duration-300 text-white ${
                  copied ? "scale-0" : "scale-100"
                }`}
              />
              <Check
                className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 text-white ${
                  copied ? "scale-100" : "scale-0"
                }`}
              />
            </BorderBeamButton>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .shiki {
          background: transparent !important;
        }
        .shiki code {
          color: #E23E6B !important;
        }
        .shiki .line span {
          color: #E23E6B !important;
        }
        .shiki .keyword, 
        .shiki .entity.name.function,
        .shiki .entity.name.tag {
          color: #E23E6B !important;
        }
        .shiki .string {
          color: #E23E6B !important;
        }
        .shiki .comment {
          color: #565f89 !important;
        }
        .command-text {
          color: #E23E6B !important;
        }
        
        /* Fix button hover state */
        .copy-button-wrapper .copy-button:hover {
          background-color: black !important;
        }
        
        .copy-button-wrapper .copy-button:hover svg {
          color: white !important;
        }
      `}</style>
    </div>
  );
}
