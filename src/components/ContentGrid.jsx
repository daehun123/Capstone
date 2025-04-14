const ContentGrid = ({ item }) => {
  return (
    <div className="grid grid-cols-2 gap-4 scroll-smooth scrollbar-hide overflow-y-auto h-[calc(100%-7rem)] mt-4">
      {item.map((item) => (
        <figure
          key={item.id}
          onClick={() => window.open(item.link)}
          className="cursor-pointer flex flex-col justify-center items-center bg-white rounded-xl shadow-sm p-2"
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full aspect-square object-cover rounded-lg"
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
