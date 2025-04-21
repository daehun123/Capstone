import { create } from "zustand";

const useContentDataStore = create((set, get) => ({
  items: [],

  setItems: (data) => set({ items: data }),

  toggleBookmark: (id) => {
    const updated = get().items.map((group) => ({
      ...group,
      detail: group.detail?.map((item) =>
        item.id === id ? { ...item, mark: !item.mark } : item
      ),
    }));
    set({ items: updated });
  },

  sendBookmark: async ()=>{
    
  }
}));

export default useContentDataStore;
