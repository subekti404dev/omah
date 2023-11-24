/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface IBookmarkStore {
  loading: boolean;
  bookmarks: IBookmark[];
  getBookmarks: () => Promise<any>;
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
export interface IUser {
  collectionId: string;
  collectionName: string;
  created: string;
  deleted: boolean;
  email: string;
  hash_password: string;
  id: string;
  name: string;
  updated: string;
  workspace_id: string;
  iat: number;
  avatar: string;
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
}));

export default useBookmarkStore;
