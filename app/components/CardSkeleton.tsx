import React from "react";

export default function CardSkeleton() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <br />
        <div className="px-4 py-4 mx-auto animate-pulse">
          <p className="w-44 h-4 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-44 dark:bg-gray-700"></p>
          <p className="w-90 h-4 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

          <div className="grid grid-cols-1 gap-2 mt-2 xl:mt-2 xl:gap-2 sm:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1">
            <div className="max-w-4xl w-full mx-auto">
              <div className="h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>

            <div className="max-w-4xl w-full mx-auto">
              <div className="h-44 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
