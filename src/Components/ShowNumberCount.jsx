import React from "react";

const ShowNumberCount = ({ listData = {} }) => {
  const count = listData?.data?.length || 0;

  return (
    <div className="flex items-center justify-center border-2 border-pano-blue-sec ml-4 sm:ml-6 md:ml-10 my-3 rounded-3xl p-1 sm:w-34 md:w-64 sm:m-5 shadow-md">
      <div className="text-center">
        <p className="text-base sm:text-lg md:text-xl font-semibold font-sans text-pano-blue-sec">
          {`Available Items: ${count}`}
        </p>
      </div>
    </div>
  );
};

export default ShowNumberCount;
