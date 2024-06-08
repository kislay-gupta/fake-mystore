import { ProductCard } from "@/components/home/ProductCard";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { ProductProps, url } from "@/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Category = () => {
  const [isLoading, setLoading] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState<ProductProps[]>();
  const { id } = useParams();
  const getCategoryDetail = () => {
    setLoading(true);
    axios
      .get(`${url}/category/${id}`)
      .then((response) => {
        setCategoryDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getCategoryDetail();
  }, []);
  console.log(categoryDetail);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 mx-4 gap-y-4">
      {isLoading &&
        [0, 0, 0, 0, 0, 0, 0, 0].map((data) => {
          return <ProductCardSkeleton key={data} />;
        })}
      {categoryDetail &&
        categoryDetail.map((data, index) => {
          return <ProductCard key={index} {...data} />;
        })}
    </div>
  );
};

export default Category;
