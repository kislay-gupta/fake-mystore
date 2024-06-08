import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const Home = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [pageLimit, setPageLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const handleInfiniteScroll = () => {
    if (pageLimit > 21) {
      toast.error("No more product to scroll");
    }
    setPageLimit(pageLimit + 8);
  };
  const getProductData = () => {
    setLoading(true);
    axios
      .get(`${url}/?limit=${pageLimit}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getProductData();
  }, [pageLimit]);
  console.log(productData);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 mx-4 gap-y-4">
      {productData &&
        productData?.map((data, index) => {
          return <ProductCard key={index} {...data} />;
        })}
      {!isLoading && (
        <div className="col-span-full flex justify-center">
          <Button disabled={isLoading} onClick={handleInfiniteScroll}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 size-4" /> loading
              </>
            ) : (
              <>LoadMore</>
            )}
          </Button>
        </div>
      )}
      {isLoading &&
        [0, 0, 0, 0, 0, 0, 0, 0].map((data) => {
          return <ProductCardSkeleton key={data} />;
        })}
    </div>
  );
};

export default Home;
