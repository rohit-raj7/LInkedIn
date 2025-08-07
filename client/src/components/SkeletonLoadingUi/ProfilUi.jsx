import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="w-[320px] mx-auto p-4 rounded-xl shadow-lg bg-white animate-pulse">
      {/* Gradient header */}
      <div className="h-20 rounded-t-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4"></div>

      {/* Profile image */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto -mt-12 border-4 border-white"></div>

      {/* Name */}
      <div className="mt-4 h-4 w-24 bg-gray-300 mx-auto rounded"></div>

      {/* Subtitle */}
      <div className="mt-2 h-3 w-16 bg-gray-200 mx-auto rounded"></div>

      {/* Description lines */}
      <div className="mt-4 space-y-2 px-4">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded w-9/12"></div>
      </div>

      {/* Location */}
      <div className="mt-4 h-3 w-20 bg-gray-300 mx-auto rounded"></div>

      {/* Skills tags */}
      <div className="flex justify-center gap-2 mt-4">
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-300 rounded-full"></div>
      </div>

      {/* Button */}
      <div className="mt-6 h-10 w-36 bg-gray-300 mx-auto rounded-lg"></div>
    </div>
  );
};

export default SkeletonCard;
