import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/hooks/useTheme";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import App from "./App";
import "./index.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl || "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConvexProvider client={convex}>
        <ThemeProvider defaultTheme="dark" storageKey="forgeai-theme">
          <CommandPaletteProvider>
            <TooltipProvider delayDuration={200}>
              <App />
              <Toaster />
            </TooltipProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </ConvexProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
