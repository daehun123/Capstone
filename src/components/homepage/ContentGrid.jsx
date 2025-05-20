import { Bookmark, Star } from "lucide-react";
import useContentDataStore from "../../store/useContentDataStore";
import useRecommendDataStore from "../../store/useRecommendDataStore";
import DOMPurify from "dompurify";
import LeafletMap from "../map/Leaflet";

const ContentGrid = ({ groupId, store = "content" }) => {
  const contentStore = useContentDataStore();
  const recommendStore = useRecommendDataStore();

  const items =
    store === "recommend" ? recommendStore.items : contentStore.items;
  const toggleBookmark =
    store === "recommend"
      ? recommendStore.toggleBookmark
      : contentStore.toggleBookmark;

  const detail = items.filter((item) => item.groupId === groupId);

  return (
    <div className="grid grid-cols-2 gap-4 scroll-smooth scrollbar-hide overflow-y-auto h-[calc(100%-7rem)] mt-4">
      {detail.map((item) => {
        const plainTitle = DOMPurify.sanitize(item.title, { ALLOWED_TAGS: [] });
        return (
          <figure
            key={item.id}
            onClick={() => window.open(item.link)}
            className="cursor-pointer flex flex-col justify-center items-center bg-white rounded-xl shadow-sm p-2 relative"
          >
            {item.type === "place" && item.lat && item.lng ? (
              <LeafletMap lng={item.lng} lat={item.lat} title={item.title} />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-lg"
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
                }}
              />
              <Bookmark
                className="absolute right-2 top-0 size-8 fill-slate-100"
                strokeWidth="0"
              />
            </div>
            <figcaption className="text-sm text-center font-semibold mt-2 leading-relaxed tracking-tight line-clamp-2">
              {plainTitle}
            </figcaption>
            {item.lprice ? (
              <figcaption className="text-sm font-semibold w-full border-t-2 text-red-500">
                {item.lprice}원
              </figcaption>
            ) : (
              <figcaption className="text-sm font-semibold line-clamp-1">
                {item.category}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
};

export default ContentGrid;
