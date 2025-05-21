"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  language?: string
  theme?: "dark" | "light" | "tokyo" | "monokai"
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
    },
    monokai: {
      bg: "bg-[#272822]",
      text: "text-[#f8f8f2]",
      lineNum: "text-[#75715e]",
      comment: "text-[#75715e]",
      keyword: "text-[#f92672]",
      string: "text-[#e6db74]",
      function: "text-[#a6e22e]",
      variable: "text-[#f8f8f2]",
      type: "text-[#66d9ef]",
      header: "bg-[#1e1f1c] border-[#1a1a17]",
      border: "border-[#1a1a17]"
    }
  }

  const t = themeStyles[theme]

  // Rust-specific syntax highlighting
  const highlightRustCode = (code: string) => {
    // Split into lines first for line-by-line processing
    const lines = code.split('\n');
    
    // Process each line separately
    const highlightedLines = lines.map(line => {
      // First, escape HTML characters
      let escapedLine = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      
      // Handle comments first (they take precedence)
      if (escapedLine.includes("//")) {
        const parts = escapedLine.split("//");
        const code = parts[0];
        const comment = "//" + parts.slice(1).join("//");
        return highlightRustLine(code) + `<span class="text-zinc-400">${comment}</span>`;
      }
      
      return highlightRustLine(escapedLine);
    });
    
    return highlightedLines;
  };
  
  // Highlight a single line of Rust code
  const highlightRustLine = (line: string) => {
    // Keywords
    const keywords = [
      "use", "mod", "pub", "struct", "enum", "fn", "let", "mut", "match", 
      "if", "else", "for", "while", "loop", "return", "self", "super", "impl", 
      "trait", "where", "type", "const", "static", "extern", "async", "await", 
      "move", "ref", "break", "continue", "crate", "in", "as", "unsafe", "dyn"
    ];
    
    // Types
    const types = [
      "String", "str", "i8", "i16", "i32", "i64", "i128", "u8", "u16", "u32", 
      "u64", "u128", "f32", "f64", "bool", "char", "Option", "Result", 
      "Vec", "HashMap", "Box", "Rc", "Arc", "Context", "Initialize", "Update", 
      "MyAccount", "Account", "Program", "System", "Signer"
    ];
    
    let tokens: string[] = [];
    let currentToken = "";
    let inString = false;
    let stringChar = "";
    
    // Tokenize the line
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      // Handle strings
      if (inString) {
        currentToken += char;
        if (char === stringChar && line[i-1] !== "\\") {
          tokens.push(currentToken);
          currentToken = "";
          inString = false;
        }
        continue;
      }
      
      // Start of string
      if (char === '"' || char === "'") {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
        currentToken += char;
        inString = true;
        stringChar = char;
        continue;
      }
      
      // Whitespace separates tokens
      if (/\s/.test(char)) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push(char);
        continue;
      }
      
      // Special characters
      if (/[(){}[\];:,.<>!@#$%^&*=+\-|\\/?]/.test(char)) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push(char);
        continue;
      }
      
      // Part of a word/identifier
      currentToken += char;
    }
    
    // Add the last token if there is one
    if (currentToken) {
      tokens.push(currentToken);
    }
    
    // Apply syntax highlighting to tokens
    return tokens.map((token, i) => {
      // Strings
      if ((token.startsWith('"') && token.endsWith('"')) || 
          (token.startsWith("'") && token.endsWith("'"))) {
        return `<span class="text-green-300">${token}</span>`;
      }
      
      // Keywords
      if (keywords.includes(token)) {
        return `<span class="text-pink-400">${token}</span>`;
      }
      
      // Types
      if (types.some(type => type === token)) {
        return `<span class="text-cyan-300">${token}</span>`;
      }
      
      // Attributes and macros
      if (token.startsWith('#') || token.endsWith('!')) {
        return `<span class="text-yellow-300">${token}</span>`;
      }
      
      // Function calls
      if (token.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && 
          i + 1 < tokens.length && tokens[i + 1] === '(') {
        return `<span class="text-yellow-300">${token}</span>`;
      }
      
      return token;
    }).join('');
  };
  
  // Simple syntax highlighting
  const highlightLine = (line: string) => {
    if (language === "rust") {
      // Use our specialized Rust highlighter
      return highlightRustLine(line);
    } else {
      // Default (JavaScript/TypeScript) syntax highlighting
      return line
        // Keywords
        .replace(
          /(import|export|from|const|let|function|return|if|else|class|interface|type|extends|implements|new|this|async|await|try|catch|for|while|switch|case|break|default|continue|throw)\b/g, 
          `<span class="text-pink-400">$1</span>`
        )
        // Strings
        .replace(
          /(['"`])(.*?)(['"`])/g, 
          `<span class="text-green-300">$1$2$3</span>`
        )
        // Function and method names
        .replace(
          /\b(\w+)(?=\s*\()/g,
          `<span class="text-yellow-300">$1</span>`
        )
        // Types
        .replace(
          /\b(string|number|boolean|any|void|object|array|Record|Promise|React|ReactNode)\b/g,
          `<span class="text-cyan-300">$1</span>`
        )
        // Comments
        .replace(
          /(\/\/.*)/g,
          `<span class="text-zinc-400">$1</span>`
        )
    }
  }

  return (
    <div className={cn("rounded-lg overflow-hidden border shadow-md bg-zinc-900 border-zinc-800")} style={{ maxWidth: "100%" }}>
      {filename && (
        <div className={cn("px-4 py-2 border-b flex items-center bg-zinc-800 border-zinc-700")}>
          <span className={cn("text-xs font-mono text-zinc-200")}>{filename}</span>
        </div>
      )}
      
      <ScrollArea className="w-full" style={{ maxHeight }}>
        <div className={cn("flex text-sm font-mono relative text-zinc-200")}>
          {showLineNumbers && (
            <div className={cn("text-right py-2 pr-4 select-none border-r text-zinc-600 border-zinc-800")} style={{ minWidth: "2.5rem" }}>
              {lines.map((_, idx) => (
                <div key={idx} className="px-2 leading-5">
                  {idx + 1}
                </div>
              ))}
            </div>
          )}
          
          <pre className="p-2 overflow-visible">
            <code className="leading-5">
              {language === "rust" 
                ? highlightRustCode(code).map((line, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
                  ))
                : lines.map((line, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }} />
                  ))
              }
            </code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  )
} 