function SkeletonCard() {
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  export default SkeletonCard