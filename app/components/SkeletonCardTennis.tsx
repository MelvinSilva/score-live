import React from "react";

export default function SkeletonCardTennis() {
  return (
    <div className="w-full mx-auto bg-gray-100 py-6 animate-pulse">
      <br />
      <br />
      <div className="flex items-center justify-center mb-6">
        <div className="rounded-full bg-gray-300 w-10 h-10 mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>

      <div className="flex justify-center ml-2 mr-2 mb-6 overflow-x-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mr-2 py-2 rounded-full bg-gray-300 text-xs px-2 min-w-fit w-16 h-6"
          ></div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 lg:mx-60">
        <div className="space-y-6 rounded-lg">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-gray-300 w-14 h-14 mr-4"></div>
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="h-4 bg-gray-300 w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 w-24 mx-auto"></div>
                  <div className="flex justify-center w-full">
                    <div className="h-4 bg-gray-300 w-16"></div>
                    <div className="h-4 bg-gray-300 w-16 mx-2"></div>
                    <div className="h-4 bg-gray-300 w-16"></div>
                  </div>
                </div>
                <div className="rounded-full bg-gray-300 w-14 h-14 ml-4"></div>
              </div>
              <div className="flex justify-between mt-4 text-gray-600 text-sm">
                <div className="h-4 bg-gray-300 w-20"></div>
                <div className="h-4 bg-gray-300 w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
