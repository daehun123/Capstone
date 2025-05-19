import useContentDataStore from "../../store/useContentDataStore";
import useRecommendDataStore from "../../store/useRecommendDataStore";
import ContentGrid from "./ContentGrid";
import { useEffect } from "react";
import { X } from "lucide-react";

const ContentModal = ({ item, onClose, store = "content" }) => {
  const contentItems = useContentDataStore((state) => state.items);
  const recommendItems = useRecommendDataStore((state) => state.items);

  const items = store === "recommend" ? recommendItems : contentItems;

  if (!item) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const count = items.filter((i) => i.groupId === item.groupId).length;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-xl max-w-sm w-full h-2/3 shadow-lg relative"
      >
        <X
          className="absolute right-2 top-2 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-between border-b-2 pb-3 gap-3">
          <div className="flex items-center gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.groupId}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <img
                src="../../../public/—Pngtree—vector location icon_3781982.png"
                alt={item.groupId}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}

            <div className="flex flex-col text-left">
              <h2 className="text-lg font-extrabold">{item.groupId}</h2>
              <p className="text-sm text-gray-500">{count}개 아이템 추천</p>
            </div>
          </div>
        </div>

        <ContentGrid groupId={item.groupId} store={store} />
      </section>
    </div>
  );
};

export default ContentModal;
