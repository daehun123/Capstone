import { create } from "zustand";

const useYoutubeDataStore = create((set) => ({
  items: [],
  setItems: (data) => set({ items: data }),
}));

export default useYoutubeDataStore;
