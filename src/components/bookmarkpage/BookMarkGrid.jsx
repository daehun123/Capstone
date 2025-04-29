import { Star } from "lucide-react";
import useContentDataStore from "../../store/useContentDataStore";
import useBookMarkItemStore from "../../store/useBookMarkItemStore";
const BookMarkPageGrid = () => {
  const { toggleBookmark } = useContentDataStore();
  const { items, toggleInBookmark } = useBookMarkItemStore();
  
  return (
    <figcaption className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <figure
          key={item.id}
          onClick={() => window.open(item.link)}
          className="cursor-pointer flex flex-col justify-start items-center overflow-hidden bg-white rounded-xl shadow-sm p-1 mt-2 relative"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-square object-cover object-center rounded-lg "
          />
          <Star
            className="text-yellow-400 absolute top-2 right-2 cursor-pointer"
            fill={item.mark ? "yellow" : "white"}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(item.id);
              toggleInBookmark(item.id);
            }}
          />
          <figcaption className="text-sm mt-1 text-center line-clamp-2">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </figcaption>
  );
};

export default BookMarkPageGrid;
