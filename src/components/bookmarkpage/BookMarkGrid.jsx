import { Bookmark, Star } from "lucide-react";
import useContentDataStore from "../../store/useContentDataStore";
import useBookMarkItemStore from "../../store/useBookMarkItemStore";
import DOMPurify from "dompurify";
import LeafletMapBookMark from "../map/LeafletBookMark";
const BookMarkPageGrid = () => {
  const { toggleBookmark } = useContentDataStore();
  const { items, toggleInBookmark } = useBookMarkItemStore();
  return (
    <figcaption className="grid grid-cols-3 gap-2">
      {items.map((item) => {
        const plainTitle = DOMPurify.sanitize(item.title, { ALLOWED_TAGS: [] });
        return (
          <figure
            key={item.id}
            onClick={() => window.open(item.link)}
            className="cursor-pointer flex flex-col justify-start items-center overflow-hidden bg-white rounded-xl shadow-sm p-1 mt-2 relative hover:shadow-md hover:bg-gray-50 transition-all"
          >
            {item.type === "place" && item.lat && item.lng ? (
              <LeafletMapBookMark
                lng={item.lng}
                lat={item.lat}
                title={item.title}
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center rounded-lg aspect-[3/4]"
              />
            )}
            <div>
              <Star
                className={`cursor-pointer hover:scale-125 transition absolute right-4 top-1.5 size-4 z-10 ${
                  item.mark
                    ? "fill-yellow-400 stroke-yellow-500"
                    : "fill-white stroke-gray-300"
                }`}
                strokeWidth="0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(item.id);
                  toggleInBookmark(item.id);
                }}
              />
              <Bookmark
                className="absolute right-2 top-0 size-8 fill-slate-100"
                strokeWidth="0"
              />
            </div>

            <figcaption className="h-[3.5rem] text-sm mt-1 text-center line-clamp-2">
              {plainTitle}
            </figcaption>
            {/* {item.lprice ? (
              <figcaption className="text-sm font-semibold w-full border-t-2 text-red-500">
                {item.lprice}원
              </figcaption>
            ) : (
              <figcaption className="text-sm font-semibold">
                {item.category}
              </figcaption>
            )} */}
          </figure>
        );
      })}
    </figcaption>
  );
};

export default BookMarkPageGrid;
