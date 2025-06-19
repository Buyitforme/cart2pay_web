export const PageLoader = () => {
//   return <div className="fixed inset-0 z-50 bg-gray-300 animate-pulse" />;
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};
