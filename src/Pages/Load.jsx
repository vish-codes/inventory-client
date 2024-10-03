import React from "react";

export default function Load() {
  return (
    <div className="flex items-center justify-center">
      {/* //   <div class="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
    // </div> */}
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    </div>
  );
}
