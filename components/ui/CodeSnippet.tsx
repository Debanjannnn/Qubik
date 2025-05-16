"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  language?: string
  theme?: "dark" | "light" | "tokyo"
  maxHeight?: string
  showLineNumbers?: boolean
  filename?: string
}

export function CodeSnippet({
  code,
  language = "typescript",
  theme = "tokyo",
  maxHeight = "300px",
  showLineNumbers = true,
  filename
}: CodeSnippetProps) {
  const lines = code.split("\n")
  
  // Define theme colors
  const themeStyles = {
    dark: {
      bg: "bg-zinc-900",
      text: "text-gray-200",
      lineNum: "text-gray-500",
      comment: "text-gray-500",
      keyword: "text-pink-400",
      string: "text-green-300",
      function: "text-yellow-300",
      variable: "text-zinc-100",
      type: "text-blue-300",
      header: "bg-zinc-800 border-zinc-700",
      border: "border-zinc-800"
    },
    light: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      lineNum: "text-gray-400",
      comment: "text-gray-400",
      keyword: "text-purple-600",
      string: "text-green-600",
      function: "text-amber-600",
      variable: "text-gray-900",
      type: "text-blue-600",
      header: "bg-gray-100 border-gray-200",
      border: "border-gray-200"
    },
    tokyo: {
      bg: "bg-[#1a1b26]",
      text: "text-[#a9b1d6]",
      lineNum: "text-[#565f89]",
      comment: "text-[#565f89]",
      keyword: "text-[#bb9af7]",
      string: "text-[#9ece6a]",
      function: "text-[#7aa2f7]",
      variable: "text-[#c0caf5]",
      type: "text-[#73daca]",
      header: "bg-[#16161e] border-[#101014]",
      border: "border-[#101014]"
    }
  }

  const t = themeStyles[theme]

  // Simple syntax highlighting
  const highlightLine = (line: string) => {
    // Replace common patterns with styled spans
    return line
      // Keywords
      .replace(
        /(import|export|from|const|let|function|return|if|else|class|interface|type|extends|implements|new|this|async|await|try|catch|for|while|switch|case|break|default|continue|throw)/g, 
        `<span class="${t.keyword}">$1</span>`
      )
      // Strings
      .replace(
        /(['"`])(.*?)(['"`])/g, 
        `<span class="${t.string}">$1$2$3</span>`
      )
      // Function and method names
      .replace(
        /\b(\w+)(?=\s*\()/g,
        `<span class="${t.function}">$1</span>`
      )
      // Types
      .replace(
        /\b(string|number|boolean|any|void|object|array|Record|Promise|React|ReactNode)\b/g,
        `<span class="${t.type}">$1</span>`
      )
      // Comments
      .replace(
        /(\/\/.*)/g,
        `<span class="${t.comment}">$1</span>`
      )
  }

  return (
    <div className={cn("rounded-lg overflow-hidden border shadow-md", t.bg, t.border)} style={{ maxWidth: "100%" }}>
      {filename && (
        <div className={cn("px-4 py-2 border-b flex items-center", t.header)}>
          <span className={cn("text-xs font-mono", t.text)}>{filename}</span>
        </div>
      )}
      
      <ScrollArea className="w-full" style={{ maxHeight }}>
        <div className={cn("flex text-sm font-mono relative", t.text)}>
          {showLineNumbers && (
            <div className={cn("text-right py-2 pr-4 select-none border-r", t.lineNum, t.border)} style={{ minWidth: "2.5rem" }}>
              {lines.map((_, idx) => (
                <div key={idx} className="px-2 leading-5">
                  {idx + 1}
                </div>
              ))}
            </div>
          )}
          
          <pre className="p-2 overflow-visible">
            <code className="leading-5">
              {lines.map((line, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }} />
              ))}
            </code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  )
} 