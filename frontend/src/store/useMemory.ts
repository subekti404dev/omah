/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { socket } from "../utils/socket";

export interface Data {
  memory: Memory;
  swap: Swap;
}

export interface Memory {
  total: number;
  used: number;
  free: number;
  shared: number;
  buff_cache: number;
  available: number;
}

export interface Swap {
  total: number;
  used: number;
  free: number;
}

interface IBookmarkStore {
  memory: Data | null;
  initialized: boolean;
  init: () => void;
}

const useMemoryStore = create<IBookmarkStore>((set, get) => ({
  memory: null,
  initialized: false,
  init: () => {
    if (!get().initialized) {
      set({ initialized: true });
      socket.emit("memory_info");
      socket.on("memory_info", (v) => {
        set({ memory: JSON.parse(v) });
        setTimeout(() => {
          socket.emit("memory_info", new Date().toISOString());
        }, 1000 * 5);
      });
    }
  },
}));

export default useMemoryStore;
