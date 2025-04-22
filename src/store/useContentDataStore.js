import { create } from "zustand";
import { bookMark } from "../util/api";

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

  sendBookmark: async () => {
    const items = get().items;
    const formatted = items.flatMap(
      (group) =>
        group.detail?.map((item) => ({
          type: "places",
          title: item.title,
          link: item.link,
          thumbnail: item.thumbnail,
        })) ?? []
    );
    const res = await bookMark(formatted);
  },
}));

export default useContentDataStore;
