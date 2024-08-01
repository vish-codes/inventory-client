import React from "react";

const ShowNumberCount = ({ listData = {} }) => {
  const count = listData?.data?.length || 0;

  return (
    <div className="flex items-center justify-center border-2 border-blue-500 sm:border-blue-300 md:border-blue-400 rounded-xl p-1 m-2 ml-6 shadow-md max-w-xs">
      <p className="text-xs sm:text-sm md:text-base font-semibold text-blue-500 text-center">
        {`Available Items: ${count}`}
      </p>
    </div>
  );
};

export default ShowNumberCount;
