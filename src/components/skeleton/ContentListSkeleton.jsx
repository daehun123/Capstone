const ContentListSkeleton = () => (
  <div className="grid grid-cols-2 gap-6 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center p-4 space-y-2 bg-gray-100 rounded-lg"
      >
        <div className="w-full aspect-square bg-gray-300 rounded-lg" />
        <div className="h-4 bg-gray-300 w-2/3 rounded" />
      </div>
    ))}
  </div>
);

export default ContentListSkeleton;
