import { create } from "zustand";
import { onBookMark, onDeleteBookMark } from "../util/api";

const useContentDataStore = create((set, get) => ({
  items: [],
  originalItems: [],

  setItems: (data) =>
    set({ items: data, originalItems: JSON.parse(JSON.stringify(data)) }),

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
    const { items, originalItems } = get();
    const changed = [];
    const deleteItem = [];

    items.foreach((group, groupIndex) => {
      group.detail?.foreach((item) => {
        const originalGroup = originalItems[groupIndex];
        const originalItem = originalGroup?.detail?.find(
          (i) => i.id === item.id
        );

        if (originalItem) {
          if (!originalItem.mark && item.mark) {
            changed.push({
              type: "places",
              title: item.title,
              address: item.address || "주소 없음",
              category: item.category || "기타",
              link: item.link,
            });
          }

          if (originalItem.mark && !item.mark) {
            deleteItem.push({
              contents_id: [item.id],
            });
          }
        }
      });
    });
    try {
      if (changed.length > 0) {
        await onBookMark(changed);
      }
      if (deleteItem.length > 0) {
        await onDeleteBookMark(deleteItem);
      }
    } catch (err) {
      console.error(err);
    }

    console.log("북마크 전송");
  },
}));

export default useContentDataStore;
