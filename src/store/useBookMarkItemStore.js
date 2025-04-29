import { create } from "zustand";
import { onDeleteBookMark } from "../util/api";

const useBookMarkItemStore = create((set, get) => ({
  items: [],
  setItem: (data) => {
    const initData = data.map((group) => ({
      ...group,
      mark: true,
    }));
    set({ items: initData });
  },

  toggleInBookmark: (id) => {
    const updated = get().items.map((group) =>
      group.id === id ? { ...group, mark: !group.mark } : group
    );
    set({ items: updated });
  },

  deleteBookmark: async () => {
    const { items } = get();
    const deleteItem = [];
    items.forEach((value) => {
      if (!value.mark) {
        deleteItem.push({
          contents_id: [value.id],
        });
      }
    });

    if (deleteItem.length > 0) {
      await onDeleteBookMark(deleteItem);
    }
  },
}));

export default useBookMarkItemStore;
