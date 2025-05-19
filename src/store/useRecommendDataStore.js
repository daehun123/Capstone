import { create } from "zustand";
import { onBookMark } from "../util/api";

const useRecommendDataStore = create((set, get) => ({
  items: [],
  originalItems: [],

  setItems: (data) => {
    if (!Array.isArray(data)) {
      console.error("setItems 오류: data가 배열이 아닙니다.", data);
      return;
    }

    const prevMarkMap = new Map(
      get().items.map((item) => [item.id, item.mark])
    );

    const merged = data.map((item) => ({
      ...item,
      mark: prevMarkMap.get(item.id) ?? false,
    }));

    const deepCopy = JSON.parse(JSON.stringify(merged));
    set({
      items: deepCopy,
      originalItems: JSON.parse(JSON.stringify(deepCopy)),
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

    items.forEach((item) => {
      const originalItem = originalItems.find((i) => i.id === item.id);
      if (originalItem && originalItem.mark === false && item.mark === true) {
        if (item.type === "shopping") {
          changed.push({
            type: item.type,
            title: item.title,
            link: item.link,
            image: item.image,
            lprice: item.price,
            hprice: item.hprice,
            mallName: item.mallName,
            productId: item.productId,
          });
        } else if (item.type === "places") {
          changed.push({
            type: item.type,
            title: item.title,
            address: item.address,
            lat: item.lat,
            lng: item.lng,
            category: item.category,
            link: item.link,
          });
        }
      }
    });

    try {
      if (changed.length > 0) {
        await onBookMark(changed);
        const updatedOriginals = get().items.map((item) => ({ ...item }));
        set({ originalItems: updatedOriginals });
      }
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useRecommendDataStore;
