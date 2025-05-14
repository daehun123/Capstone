import { create } from "zustand";

const useYoutubeDataStore = create((set, get) => ({
  items: [],
  setItems: (data) => set({ items: data }),

  setDescriptionItem: (id, description) => {
    const updatedItems = get().items.map((item) =>
      item.id === id ? { ...item, description } : item
    );
    set({ items: updatedItems });
  },
}));

export default useYoutubeDataStore;
