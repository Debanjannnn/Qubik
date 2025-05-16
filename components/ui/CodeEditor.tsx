"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
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
  Plus,
  RefreshCw,
  Settings,
  X,
} from "lucide-react"

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState("index.tsx")
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true,
    components: true,
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
            <span>Terminal</span>
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
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r border-zinc-800">
          <div className="h-full flex flex-col">
            <div className="p-2 text-sm font-medium flex items-center justify-between">
              <span>EXPLORER</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                <div className="mb-2">
                  <div
                    className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer"
                    onClick={() => toggleFolder("src")}
                  >
                    {expandedFolders["src"] ? (
                      <ChevronDown className="h-4 w-4 text-zinc-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    )}
                    {expandedFolders["src"] ? (
                      <FolderOpen className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Folder className="h-4 w-4 text-blue-400" />
                    )}
                    <span>src</span>
                  </div>

                  {expandedFolders["src"] && (
                    <div className="ml-4">
                      <div
                        className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer"
                        onClick={() => toggleFolder("components")}
                      >
                        {expandedFolders["components"] ? (
                          <ChevronDown className="h-4 w-4 text-zinc-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        )}
                        {expandedFolders["components"] ? (
                          <FolderOpen className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Folder className="h-4 w-4 text-blue-400" />
                        )}
                        <span>components</span>
                      </div>

                      {expandedFolders["components"] && (
                        <div className="ml-4">
                          <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer bg-zinc-800">
                            <FileCode className="h-4 w-4 text-cyan-400" />
                            <span>index.tsx</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                            <FileCode className="h-4 w-4 text-cyan-400" />
                            <span>Button.tsx</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                            <FileCode className="h-4 w-4 text-cyan-400" />
                            <span>Card.tsx</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                        <FileCode className="h-4 w-4 text-cyan-400" />
                        <span>App.tsx</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                        <FileCode className="h-4 w-4 text-cyan-400" />
                        <span>main.tsx</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                    <Folder className="h-4 w-4 text-blue-400" />
                    <span>public</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <FileJson className="h-4 w-4 text-orange-400" />
                    <span>package.json</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <File className="h-4 w-4 text-zinc-400" />
                    <span>README.md</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Editor Area */}
        <ResizablePanel defaultSize={60} className="flex flex-col">
          {/* Tabs */}
          <div className="border-b border-zinc-800 flex">
            <div className="flex-1 flex">
              <div
                className={`px-4 py-2 flex items-center gap-2 text-sm border-r border-zinc-800 ${
                  activeTab === "index.tsx" ? "bg-zinc-800" : "bg-zinc-900"
                }`}
              >
                <FileCode className="h-4 w-4 text-cyan-400" />
                <span>index.tsx</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 text-zinc-400">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div
                className={`px-4 py-2 flex items-center gap-2 text-sm border-r border-zinc-800 ${
                  activeTab === "App.tsx" ? "bg-zinc-800" : "bg-zinc-900"
                }`}
              >
                <FileCode className="h-4 w-4 text-cyan-400" />
                <span>App.tsx</span>
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
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <code className="pl-10 block">
                <span className="text-pink-400">import</span> <span className="text-cyan-300">React</span>{" "}
                <span className="text-pink-400">from</span> <span className="text-green-300">&apos;react&apos;</span>;
                {"\n"}
                <span className="text-pink-400">import</span>{" "}
                <span className="text-cyan-300">&#123; Button &#125;</span> <span className="text-pink-400">from</span>{" "}
                <span className="text-green-300">&apos;./Button&apos;</span>;{"\n"}
                <span className="text-pink-400">import</span> <span className="text-cyan-300">&#123; Card &#125;</span>{" "}
                <span className="text-pink-400">from</span> <span className="text-green-300">&apos;./Card&apos;</span>;
                {"\n"}
                {"\n"}
                <span className="text-pink-400">interface</span> <span className="text-blue-300">ComponentProps</span>{" "}
                <span className="text-zinc-100">&#123;</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-300">title</span>: <span className="text-blue-300">string</span>;{"\n"}
                {"  "}
                <span className="text-zinc-300">description</span>?: <span className="text-blue-300">string</span>;
                {"\n"}
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"\n"}
                <span className="text-pink-400">export</span> <span className="text-pink-400">const</span>{" "}
                <span className="text-yellow-300">Component</span> = <span className="text-orange-300">(</span>
                <span className="text-zinc-300">props</span>: <span className="text-blue-300">ComponentProps</span>
                <span className="text-orange-300">)</span> <span className="text-orange-300">=&gt;</span>{" "}
                <span className="text-zinc-100">&#123;</span>
                {"\n"}
                {"  "}
                <span className="text-pink-400">const</span> <span className="text-zinc-100">&#123;</span>{" "}
                <span className="text-zinc-300">title</span>, <span className="text-zinc-300">description</span>{" "}
                <span className="text-zinc-100">&#125;</span> = <span className="text-zinc-300">props</span>;{"\n"}
                {"\n"}
                {"  "}
                <span className="text-pink-400">return</span> <span className="text-orange-300">(</span>
                {"\n"}
                {"    "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-blue-300">Card</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"      "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-blue-300">div</span> <span className="text-zinc-300">className</span>
                <span className="text-zinc-400">=</span>
                <span className="text-green-300">&quot;p-4&quot;</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"        "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-blue-300">h2</span> <span className="text-zinc-300">className</span>
                <span className="text-zinc-400">=</span>
                <span className="text-green-300">&quot;text-xl font-bold&quot;</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"          "}
                <span className="text-zinc-100">&#123;</span>
                <span className="text-zinc-300">title</span>
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"        "}
                <span className="text-zinc-400">&lt;/</span>
                <span className="text-blue-300">h2</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"        "}
                <span className="text-zinc-100">&#123;</span>
                <span className="text-zinc-300">description</span> <span className="text-pink-400">&amp;&amp;</span>{" "}
                <span className="text-orange-300">(</span>
                {"\n"}
                {"          "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-blue-300">p</span> <span className="text-zinc-300">className</span>
                <span className="text-zinc-400">=</span>
                <span className="text-green-300">&quot;mt-2 text-gray-500&quot;</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"            "}
                <span className="text-zinc-100">&#123;</span>
                <span className="text-zinc-300">description</span>
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"          "}
                <span className="text-zinc-400">&lt;/</span>
                <span className="text-blue-300">p</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"        "}
                <span className="text-orange-300">)</span>
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"        "}
                <span className="text-zinc-400">&lt;</span>
                <span className="text-blue-300">Button</span> <span className="text-zinc-300">className</span>
                <span className="text-zinc-400">=</span>
                <span className="text-green-300">&quot;mt-4&quot;</span>
                <span className="text-zinc-400">&gt;</span>Click Me<span className="text-zinc-400">&lt;/</span>
                <span className="text-blue-300">Button</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"      "}
                <span className="text-zinc-400">&lt;/</span>
                <span className="text-blue-300">div</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"    "}
                <span className="text-zinc-400">&lt;/</span>
                <span className="text-blue-300">Card</span>
                <span className="text-zinc-400">&gt;</span>
                {"\n"}
                {"  "}
                <span className="text-orange-300">)</span>;{"\n"}
                <span className="text-zinc-100">&#125;</span>
                {"\n"}
                {"\n"}
                <span className="text-pink-400">export</span> <span className="text-pink-400">default</span>{" "}
                <span className="text-yellow-300">Component</span>;{"\n"}
              </code>
            </pre>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Problems, Output, Terminal */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-l border-zinc-800">
          <Tabs defaultValue="terminal" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-zinc-900 px-2">
              <TabsTrigger value="problems" className="text-xs">
                Problems
              </TabsTrigger>
              <TabsTrigger value="output" className="text-xs">
                Output
              </TabsTrigger>
              <TabsTrigger value="terminal" className="text-xs">
                Terminal
              </TabsTrigger>
            </TabsList>
            <TabsContent value="problems" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full p-4">
                <div className="text-sm text-zinc-400">No problems detected.</div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="output" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full p-4">
                <div className="text-sm font-mono">
                  <div className="text-green-400">Build completed successfully</div>
                  <div className="text-zinc-400">Compiled 12 files in 1.2s</div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="terminal" className="flex-1 p-0 m-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b border-zinc-800 px-4 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-zinc-400">Terminal</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-300">bash</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-2">
                  <div className="font-mono text-xs">
                    <div className="text-zinc-400">$ npm start</div>
                    <div className="text-green-400">&gt; project@0.1.0 start</div>
                    <div className="text-green-400">&gt; vite</div>
                    <div className="text-zinc-300">VITE v4.4.9 ready in 124 ms</div>
                    <div className="text-zinc-300">➜ Local: http://localhost:5173/</div>
                    <div className="text-zinc-300">➜ Network: use --host to expose</div>
                    <div className="text-zinc-300">➜ press h to show help</div>
                    <div className="text-zinc-400 mt-1">$</div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>

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