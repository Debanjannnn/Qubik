"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronDown,
  ChevronRight,
  File,
  FileCode,
  FileJson,
  Folder,
  FolderOpen,
  GitBranch,
  MoreHorizontal,
  Settings,
  X,
} from "lucide-react"

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState("index.ts")
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    node_modules: true,
    Updations: true,
  })

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }))
  }

  return (
    <div className="h-full w-full flex flex-col bg-zinc-900 text-zinc-100 overflow-hidden rounded-lg">
      {/* Top Bar */}
      <div className="h-12 border-b border-zinc-800 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Code Editor</span>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Run</span>
            <span>Help</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* File Explorer */}
        <div className="w-[250px] border-r border-zinc-800 h-full flex flex-col">
          <div className="p-2 text-sm font-medium flex items-center justify-between">
            <span>EXPLORER</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              <div className="mb-2">
                <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer bg-zinc-800">
                  <FileCode className="h-4 w-4 text-cyan-400" />
                  <span className="truncate max-w-[120px]">index.ts</span>
                </div>
                <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                  <FileJson className="h-4 w-4 text-orange-400" />
                  <span className="truncate max-w-[120px]">package.json</span>
                </div>
                <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                  <FileJson className="h-4 w-4 text-orange-400" />
                  <span className="truncate max-w-[120px]">package-lock.json</span>
                </div>
              
                <div
                  className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer"
                  onClick={() => toggleFolder("Updations")}
                >
                  {expandedFolders["Updations"] ? (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  )}
                  {expandedFolders["Updations"] ? (
                    <FolderOpen className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Folder className="h-4 w-4 text-blue-400" />
                  )}
                  <span>Updations</span>
                </div>

                {expandedFolders["Updations"] && (
                  <div className="ml-4">
                    {/* Empty Updations folder for now */}
                  </div>
                )}
                
                <div
                  className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer"
                  onClick={() => toggleFolder("node_modules")}
                >
                  {expandedFolders["node_modules"] ? (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  )}
                  {expandedFolders["node_modules"] ? (
                    <FolderOpen className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <Folder className="h-4 w-4 text-yellow-400" />
                  )}
                  <span>node_modules</span>
                </div>

                {expandedFolders["node_modules"] && (
                  <div className="ml-4">
                    {/* node_modules content */}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="border-b border-zinc-800 flex">
            <div className="flex-1 flex">
              <div className="px-4 py-2 flex items-center gap-2 text-sm border-r border-zinc-800 bg-zinc-800">
                <FileCode className="h-4 w-4 text-cyan-400" />
                <span>index.ts</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 text-zinc-400">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center px-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Code Area */}
          <ScrollArea className="flex-1 p-4 font-mono text-sm">
            <pre className="relative">
              <div className="absolute left-0 text-right pr-4 text-zinc-600 select-none" style={{ width: "2rem" }}>
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <code className="pl-10 block">
                <span className="text-pink-400">import</span> <span className="text-cyan-300">&#123; QubikAccount, QubikUpdate &#125;</span>{" "}
                <span className="text-pink-400">from</span> <span className="text-green-300">&quot;@Qubik/solana&quot;</span>;
                {"\n"}
                {"\n"}
                <span className="text-yellow-300">QubikAccount</span>: <span className="text-blue-300">Account</span> <span className="text-zinc-100">&#123;</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-300">signer</span>: <span className="text-zinc-400">owner</span>,{" "}
                {"\n"}
                {"  "}
                <span className="text-zinc-300">options</span>: <span className="text-green-300">&quot;init&quot;</span>,{" "}
                {"\n"}
                {"  "}
                <span className="text-zinc-300">relate</span>: <span className="text-cyan-300">SystemProgram</span>,{" "}
                {"\n"}
                {"  "}
                <span className="text-zinc-300">size</span>{" "}
                {"\n"}
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"\n"}
                <span className="text-yellow-300">QubikUpdate</span>: <span className="text-blue-300">Instruction</span> <span className="text-zinc-100">&#123;</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-300">signer</span>: <span className="text-zinc-400">owner</span>,{" "}
                {"\n"}
                {"  "}
                <span className="text-zinc-300">account</span>: <span className="text-cyan-300">QubikAccount</span>,{" "}
                {"\n"}
                {"  "}
                <span className="text-zinc-300">options</span>: <span className="text-green-300">&quot;mut&quot;</span>,{" "}
                {"\n"}
                <span className="text-zinc-100">&#125;</span>
              </code>
            </pre>
          </ScrollArea>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-zinc-800 bg-zinc-900 text-zinc-400 flex items-center px-4 text-xs">
        <div className="flex items-center gap-2">
          <GitBranch className="h-3 w-3" />
          <span>main</span>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span>Ln 15, Col 42</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>
    </div>
  )
} 