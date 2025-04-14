import { Star, X } from "lucide-react";
import ContentGrid from "./ContentGrid";
import { useEffect } from "react";

const ContentModal = ({ item, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!item) return null;

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
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex flex-col text-left">
              <h2 className="text-lg font-extrabold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                {item.detail?.length || 0}개 추천
              </p>
            </div>
          </div>
          <Star className="text-yellow-400 absolute top-14 right-4 cursor-pointer" />
        </div>

        <ContentGrid item={item.detail} />
      </section>
    </div>
  );
};

export default ContentModal;
