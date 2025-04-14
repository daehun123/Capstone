import { X } from "lucide-react";
import { useEffect } from "react";

const YoutubeModal = ({ item, onClose }) => {
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
        className="bg-white p-5 rounded-2xl max-w-sm w-full h-2/3 shadow-xl relative flex flex-col justify-between"
      >
        <X
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-black"
          onClick={onClose}
        />
        <div className="flex flex-col items-center border-b pb-4 gap-3">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="rounded-lg h-28 object-cover"
          />
          <h2 className="text-center text-xl font-bold text-gray-800 leading-tight">
            {item.title}
          </h2>
        </div>

        <figcaption className="whitespace-pre-line text-sm mt-2 text-gray-700">
          {item.description}
        </figcaption>

        <button
          className="mt-6 bg-[#034AA6] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#022f6b] transition w-full"
          onClick={() => window.open(item.link)}
        >
          🎥 영상 보러 가기
        </button>
      </section>
    </div>
  );
};

export default YoutubeModal;
