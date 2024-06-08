import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductPageSkelton = () => {
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <Skeleton className="lg:w-1/2 w-full lg:h-96 h-64 rounded" />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkelton;
