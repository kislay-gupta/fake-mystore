import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/ui/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
const Home = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const getProductData = () => {
    setLoading(true);
    axios
      .get(url)
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
  }, []);
  console.log(productData);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 mx-4 gap-y-4">
      {isLoading &&
        [0, 0, 0, 0, 0, 0, 0, 0].map((data) => {
          return <ProductCardSkeleton key={data} />;
        })}
      {productData &&
        productData.map((data, index) => {
          return <ProductCard key={index} {...data} />;
        })}
    </div>
  );
};

export default Home;
