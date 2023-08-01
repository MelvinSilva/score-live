import React from "react";

export default function SkeletonListActu() {
  return (
    <div className="w-full mx-auto bg-gray-100 animate-pulse">
      <p className="w-full mx-auto bg-gray-200 font-semibold text-sm py-1 px-4 text-sm center text-center">
        LES DERNIERES ACTUALITÉS
      </p>
      <div className="max-w-5xl mx-auto">
        <div className="flex mx-auto items-center bg-white border mt-3 p-2 border-gray-200 rounded-lg shadow xs:flex-row ml-2 mr-2">
          <div className="object-cover w-40 h-32 rounded-lg bg-gray-300"></div>
          <div className="flex flex-col justify-between p-2 leading-normal w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
        <div className="flex mx-auto items-center bg-white border mt-3 p-2 border-gray-200 rounded-lg shadow xs:flex-row ml-2 mr-2">
          <div className="object-cover w-40 h-32 rounded-lg bg-gray-300"></div>
          <div className="flex flex-col justify-between p-2 leading-normal w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
        <div className="flex mx-auto items-center bg-white border mt-3 p-2 border-gray-200 rounded-lg shadow xs:flex-row ml-2 mr-2">
          <div className="object-cover w-40 h-32 rounded-lg bg-gray-300"></div>
          <div className="flex flex-col justify-between p-2 leading-normal w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="flex mx-auto items-center bg-white border mt-3 p-2 border-gray-200 rounded-lg shadow xs:flex-row ml-2 mr-2">
        <div className="object-cover w-40 h-32 rounded-lg bg-gray-300"></div>
        <div className="flex flex-col justify-between p-2 leading-normal w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
