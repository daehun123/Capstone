import useRecommendDataStore from "../../store/useRecommendDataStore";
import LeafletMap from "../map/Leaflet";

const ContentList = ({ onItemClick }) => {
  const { items } = useRecommendDataStore();

  const uniqueGroups = Array.from(
    new Map(items.map((item) => [item.groupId, item])).values()
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      {uniqueGroups.map((item) => (
        <figure
          key={item.groupId}
          onClick={() => onItemClick(item)}
          className="flex flex-col items-center justify-center p-4 space-y-2 bg-white rounded-lg hover:shadow-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
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
          <figcaption className="text-center font-bold">
            {item.groupId}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ContentList;
