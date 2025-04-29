import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import useContentDataStore from "../../store/useContentDataStore";

const ContentGrid = ({ itemId }) => {
  const nav = useNavigate();
  const { items, toggleBookmark } = useContentDataStore();

  const detail = items.find((group) => group.id === itemId)?.detail || [];

  return (
    <div className="grid grid-cols-2 gap-4 scroll-smooth scrollbar-hide overflow-y-auto h-[calc(100%-7rem)] mt-4">
      {detail.map((item) => (
        <figure
          key={item.id}
          onClick={() => window.open(item.link)}
          className="cursor-pointer flex flex-col justify-center items-center bg-white rounded-xl shadow-sm p-2 relative"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-square object-cover rounded-lg"
          />

          <Star
            className="text-yellow-400 absolute top-3 right-3 cursor-pointer"
            fill={item.mark ? "yellow" : "white"}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(item.id);
            }}
          />

          <figcaption className="text-sm text-center font-semibold mt-2 leading-tight tracking-tight line-clamp-2 h-[3.5rem]">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ContentGrid;
