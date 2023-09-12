import React from "react";

export default function SkeletonResultatTable() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <br />
      <br />
      <br />
      <div className="w-full mx-auto bg-gray-100 py-6 animate-pulse lg:mx-60 p-4">
        <div className="space-y-2 rounded-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-2 rounded-lg bg-white">
              <div className="flex items-center justify-between">
                {/* Bloc d'équipe à domicile */}
                <div className="flex items-center w-1/4 cursor-pointer">
                  <div
                    className="animate-pulse rounded-xs bg-gray-300"
                    style={{ width: 20, height: 20 }}
                  />
                  <div className="ml-2 animate-pulse bg-gray-300 text-transparent">
                    _______
                  </div>
                </div>

                {/* Bloc de score et d'information sur le match */}
                <div className="flex flex-col items-center justify-center w-1/2">
                  {/* Date et heure */}
                  <div className="animate-pulse bg-gray-300 text-transparent text-xs">
                    _______
                  </div>
                  {/* Score */}
                  <div className="font-semibold text-xs text-center current-score-foot m-4 animate-pulse bg-gray-300 text-transparent">
                    __ - __
                  </div>
                  {/* Status */}
                  <div className="animate-pulse bg-gray-300 text-transparent text-xs">
                    _______
                  </div>
                </div>

                {/* Bloc d'équipe en déplacement */}
                <div className="flex items-center w-1/4 justify-end cursor-pointer">
                  <div className="mr-2 animate-pulse bg-gray-300 text-transparent">
                    _______
                  </div>
                  <div
                    className="animate-pulse rounded-xs bg-gray-300"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
