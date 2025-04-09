const ContentList = ({ data, onItemClick }) => {
  return (
    <section className=" border-t-2 border-gray-200">
      <div className="flex flex-col items-start pl-4 pt-4">
        <p className="font-extrabold text-xl text-[#034AA6]">Something Else</p>
        <p className="text-gray-500 font-semibold text-sm">
          이런 느낌은 어떨까요?
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {data.map((item) => (
          <figure
            key={item.id}
            onClick={() => onItemClick(item)}
            className="flex flex-col items-center justify-center p-4 space-y-2 bg-white rounded-lg hover:shadow-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
          >
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <figcaption className="text-center font-bold">
              {item.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ContentList;
