const YoutubeSkeleton = () => (
  <section className="w-full min-h-50 border-t-2">
    <h2 className="flex flex-col items-start pt-4 pl-4">
      <p className="text-xl text-[#034AA6] font-extrabold">Your Vibe</p>
      <p className="text-gray-500 font-semibold text-sm">취향에 쏙 들거에요</p>
    </h2>
    <div className="w-full mt-2 px-2 animate-pulse flex gap-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex-1 bg-gray-200 h-24 rounded-lg" />
      ))}
    </div>
  </section>
);

export default YoutubeSkeleton;
