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
    const deleteItem = items
      .filter((value) => !value.mark)
      .map((value) => value.id);

    if (deleteItem.length > 0) {
      await onDeleteBookMark(deleteItem);
    }
  },
  getUnmarkedIds: () => {
    return get()
      .items.filter((item) => !item.mark)
      .map((item) => item.id);
  },
}));

export default useBookMarkItemStore;
