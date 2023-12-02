/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import wait from "wait";

interface IBookmarkStore {
  loading: boolean;
  bookmarks: IBookmark[];
  getBookmarks: () => Promise<any>;
  addCategory: (data: any, onAfter?: () => void) => Promise<any>;
  addItem: (data: any, onAfter?: () => void) => Promise<any>;
  deleteItem: (itemId: number, categoryId: number) => Promise<any>;
  deleteCategory: (categoryId: number) => Promise<any>;
}
export interface IBookmark {
  id: number;
  name: string;
  sort: number;
  items: IBookmarkItem[];
}
export interface IBookmarkItem {
  id: number;
  name: string;
  sort: number;
  url: string;
  icon: string;
}

const useBookmarkStore = create<IBookmarkStore>((set, get) => ({
  loading: false,
  bookmarks: [],
  getBookmarks: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/bookmarks");
      if (data.data) {
        set({ bookmarks: data.data, loading: false });
        return data.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  addCategory: async ({ name }, onAfter) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().post("/bookmarks/categories", {
        name,
      });
      if (data.data) {
        set({ loading: false });
        onAfter?.();
        await wait(500);
        return get().getBookmarks();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  addItem: async ({ name, url, icon, category_id }, onAfter) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().post("/bookmarks/items", {
        name,
        url,
        icon,
        category_id: parseInt(category_id),
      });
      if (data.data) {
        set({ loading: false });
        onAfter?.();
        await wait(500);
        return get().getBookmarks();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteItem: async (itemId, categoryId) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().delete(
        `/bookmarks/categories/${categoryId}/items/${itemId}`
      );
      if (data.success) {
        set({ loading: false });
        await wait(500);
        return get().getBookmarks();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().delete(
        `/bookmarks/categories/${categoryId}`
      );
      if (data.success) {
        set({ loading: false });
        await wait(500);
        return get().getBookmarks();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useBookmarkStore;
