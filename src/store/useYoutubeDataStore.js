import { create } from "zustand";

const useYoutubeDataStore = create((set, get) => ({
  items: [],
  setItems: (data) => set({ items: data }),
}));

export default useYoutubeDataStore;
