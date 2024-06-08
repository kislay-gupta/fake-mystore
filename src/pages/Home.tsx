import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
const Home = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [pageLimit, setPageLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
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
          <Button
            onClick={() => {
              setPageLimit(pageLimit + 8);
            }}
          >
            LoadMore
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
