import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/ui/home/ProductCard";
import { ProductProps } from "@/constant";
const Home = () => {
  const url = "https://fakestoreapi.com/products";
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const getProductData = () => {
    axios
      .get(url)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductData();
  }, []);
  console.log(productData);
  return (
    <div className="grid grid-cols-4  gap-4">
      {productData &&
        productData.map((data, index) => {
          return <ProductCard key={index} {...data} />;
        })}
    </div>
  );
};

export default Home;
