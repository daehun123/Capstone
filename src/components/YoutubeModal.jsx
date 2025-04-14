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
        className="bg-white p-4 rounded-xl max-w-sm w-full h-2/3 shadow-lg relative"
      >
        <X
          className="absolute right-2 top-2 cursor-pointer "
          onClick={onClose}
        />
        <div className="flex items-center border-b-2 pb-2">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="rounded-lg h-24"
          />
          <h2 className="text-lg font-extrabold h-full w-full ">
            {item.title}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default YoutubeModal;
