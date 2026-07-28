import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Plus,
  SlidersHorizontal,
  StopCircle,
  Code2,
  Loader2,
  PanelRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
};

const suggestions = [
  "Build a task management SaaS with authentication and real-time updates",
  "Analyze this repo for performance bottlenecks",
  "Design a database schema for a marketplace platform",
  "Create a CI/CD pipeline for my Next.js app",
];

const exampleMessages = [
  { icon: Code2, text: "Build a full-stack application with..." },
  { icon: Sparkles, text: "Explain this codebase architecture..." },
  { icon: Code2, text: "Debug this error: TypeError: Cannot read..." },
  { icon: Sparkles, text: "Deploy my application to production..." },
];

export default function Workspace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        role: "assistant",
        content: getSimulatedResponse(input.trim()),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full">
      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl shadow-indigo-500/20">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-semibold">AI Software Engineer</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Describe what you want to build, and I'll make it happen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid w-full max-w-2xl gap-2 sm:grid-cols-2"
            >
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="rounded-xl border bg-card/30 p-3 text-left text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-card/60 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          </div>
        ) : (
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="mx-auto max-w-3xl space-y-4 p-4 lg:p-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-border/50 rounded-tl-sm",
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isStreaming && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card px-4 py-3 rounded-tl-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        )}

        {/* Input area */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl p-4">
          <div className="mx-auto flex max-w-3xl items-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="mb-1 h-10 w-10 shrink-0 rounded-xl"
              title="New conversation"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you want to build..."
                className="min-h-[44px] max-h-32 resize-none rounded-xl pr-12"
                rows={1}
              />
              <div className="absolute bottom-1.5 right-1.5 flex gap-1">
                <Button
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all",
                    isStreaming && "bg-destructive hover:bg-destructive/90",
                  )}
                  onClick={isStreaming ? () => setIsStreaming(false) : handleSend}
                >
                  {isStreaming ? (
                    <StopCircle className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="mb-1 h-10 w-10 shrink-0 rounded-xl"
              title="Model settings"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-muted-foreground">
            ForgeAI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

function getSimulatedResponse(input: string): string {
  const responses = [
    "I'll start by analyzing the requirements and breaking this down into manageable tasks. Let me create an implementation plan:\n\n1. **Architecture Design** — Defining the component structure and data flow\n2. **Backend Setup** — Configuring the database and API endpoints\n3. **Frontend Implementation** — Building the UI components\n4. **Integration & Testing** — Connecting everything and verifying\n\nLet me begin with the architecture phase...",
    "I've analyzed your request. Here's what I found:\n\n- The approach you described is feasible\n- I recommend using a modular architecture\n- There are 3 potential performance considerations\n\nLet me start implementing the solution step by step.",
    "Great idea! I'll build this out for you. Here's my plan:\n\n**Phase 1**: Set up the project structure and dependencies\n**Phase 2**: Implement core functionality\n**Phase 3**: Add polishing touches\n\nStarting now...",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
