import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>

      <div className="flex flex-col sm:flex-row sm:items-start px-6 py-8 relative">
        {/* Profile image */}
        <div className="-mt-20 sm:-mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300"></div>
        </div>

        {/* Info */}
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
          {/* Name, subtitle, location */}
          <div className="h-5 bg-gray-300 w-32 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 w-20 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 w-16 rounded"></div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="px-6 pb-6 space-y-3">
        <div className="h-4 bg-gray-300 w-24 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        <div className="h-4 bg-gray-200 rounded w-9/12"></div>

        {/* Skills */}
        <div className="h-4 bg-gray-300 w-32 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
