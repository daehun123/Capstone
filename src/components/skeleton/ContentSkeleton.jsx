const ContentSkeleton = () => (
  <section className="min-h-80 p-4 bg-white pb-6">
    <h2 className="text-xl font-extrabold text-[#034AA6] pb-6">
      Today&apos;s Show
    </h2>
    <div className="w-full flex justify-center">
      <div className="w-[90%] space-y-2 animate-pulse">
        <div className="h-52 bg-gray-200 rounded-lg" />
        <div className="h-4 bg-gray-200 w-1/2 mx-auto rounded" />
      </div>
    </div>
  </section>
);

export default ContentSkeleton;
