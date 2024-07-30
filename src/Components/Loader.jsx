import React from "react";

export default function Loader() {
  return (
    <div class="card rounded-[12px] m-5 text-xl shadow-xl p-5 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div class="w-full h-[27rem] bg-gray-200 rounded mb-3"></div>
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
    </div>
  );
}
