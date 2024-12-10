import React from "react";

const ShowNumberCount = ({ listData = {} }) => {
  const count = listData?.data?.length || 0;

  return (
    <div className="flex items-center justify-center border-2 border-pano-blue sm:border-pano-blue md:border-pano-blue rounded-xl p-1 my-3 shadow-md max-w-xs">
      <p className="text-l sm:text-l md:text-base font-semibold text-pano-blue text-center">
        {`Available Items: ${count}`}
      </p>
    </div>
  );
};

export default ShowNumberCount;
