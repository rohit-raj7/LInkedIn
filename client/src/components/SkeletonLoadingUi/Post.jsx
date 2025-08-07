import React from 'react';

const PostCardSkeleton = () => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white p-4 rounded-lg shadow-sm animate-pulse">
      {/* Header: Profile image + Name + Time */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
        <div className="h-3 w-8/12 bg-gray-200 rounded"></div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-2 border-t border-gray-100">
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
