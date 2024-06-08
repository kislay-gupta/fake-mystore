import React from "react";

const EmptySearch = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <img
        src="/elements-search.png"
        alt="empty search"
        width={140}
        height={140}
      />
      <h2 className="text-2x font-semibold mt-6">No result Found!</h2>
      <p className="text-muted-foreground  text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
