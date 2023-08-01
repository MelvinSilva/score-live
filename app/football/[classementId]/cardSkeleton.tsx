import React from "react";

export default function CardSkeleton() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-2 py-4 mx-auto animate-pulse">
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

          <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1">
            <div className="w-full">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="w-full ">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="w-full ">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="w-full ">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="w-full ">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="w-full ">
              <div className="w-full h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
