import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full h-full container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {Array(8)
        // .fill()
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-lg w-full"
          >
            <div className="bg-gray-100 h-[524px]"></div>
            <div className="bg-gray-100 mt-2 h-6 w-10/12"></div>
            <div className="bg-gray-100 mt-2 h-6 w-6/12"></div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(Skeleton);
