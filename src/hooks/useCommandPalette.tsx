import { createContext, useContext, useState, useCallback } from "react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => void;
  shortcut?: string;
  category?: string;
}

interface CommandPaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  commands: CommandItem[];
  registerCommands: (items: CommandItem[]) => void;
}

const CommandPaletteContext = createContext<CommandPaletteState | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<CommandItem[]>([]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const registerCommands = useCallback((items: CommandItem[]) => {
    setCommands((prev) => {
      const existing = new Map(prev.map((c) => [c.id, c]));
      items.forEach((item) => existing.set(item.id, item));
      return Array.from(existing.values());
    });
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle, commands, registerCommands }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  }
  return context;
}
