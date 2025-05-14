import { create } from "zustand";
import { onBookMark, onDeleteBookMark } from "../util/api";

const useContentDataStore = create((set, get) => ({
  items: [],
  originalItems: [],

  setItems: (data) => {
    if (!Array.isArray(data)) {
      console.error("setItems 오류: data가 배열이 아닙니다.", data);
      return;
    }
    const deepCopy = JSON.parse(JSON.stringify(data));
    set({
      items: deepCopy,
      originalItems: deepCopy,
    });
  },

  toggleBookmark: (id) => {
    const updated = get().items.map((item) =>
      item.id === id ? { ...item, mark: !item.mark } : item
    );
    set({ items: updated });
  },

  sendBookmark: async () => {
    const { items, originalItems } = get();
    const changed = [];
    const deleted = [];

    items.forEach((item) => {
      const originalItem = originalItems.find((i) => i.id === item.id);

      if (originalItem) {
        if (!originalItem.mark && item.mark) {
          changed.push({
            type: item.type,
            title: item.title,
            address: item.address || "주소 없음",
            category: item.category || "기타",
            link: item.link,
          });
        }

        if (originalItem.mark && !item.mark) {
          deleted.push({
            contents_id: [item.id],
          });
        }
      }
    });

    try {
      if (changed.length > 0) {
        await onBookMark(changed);
      }
      if (deleted.length > 0) {
        await onDeleteBookMark(deleted);
      }
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useContentDataStore;
