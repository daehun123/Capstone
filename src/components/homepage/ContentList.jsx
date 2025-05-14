import useContentDataStore from "../../store/useContentDataStore";

const ContentList = ({ onItemClick }) => {
  const { items } = useContentDataStore();

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
          <img
            src={item.image}
            alt={item.groupId}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <figcaption className="text-center font-bold">
            {item.groupId}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ContentList;
