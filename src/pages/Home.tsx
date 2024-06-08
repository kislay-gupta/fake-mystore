import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import useSearch from "@/hooks/useSearch";
import EmptySearch from "@/components/EmptySearch";
import ProductFilter from "@/components/ProductFilter";

const Home = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [searchParams] = useSearchParams();

  const [pageLimit, setPageLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchQuery = searchParams.get("search") || "";

  const handleInfiniteScroll = () => {
    if (pageLimit >= 21) {
      toast.error("No more products to scroll");
      setHasMore(false);
      return;
    }
    setPageLimit((prevLimit) => prevLimit + 8);
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
  }, [pageLimit, searchQuery]);

  const filteredProducts = useSearch(productData, searchQuery); // Use the custom hook
  const noResults = !isLoading && filteredProducts.length === 0;
  const updateRating = (e: string) => {
    if (e === "lowToHighPrice") {
      const sortedProducts = [...productData].sort((a, b) => a.price - b.price);
      setProductData(sortedProducts);
    } else if (e === "highToLowPrice") {
      const sortedProducts = [...productData].sort((a, b) => b.price - a.price);
      setProductData(sortedProducts);
    } else if (e === "lowToHigh") {
      const sortedProducts = [...productData].sort(
        (a, b) => a.rating.rate - b.rating.rate
      );
      setProductData(sortedProducts);
    } else if (e === "highToLow") {
      const sortedProducts = [...productData].sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
      setProductData(sortedProducts);
    } else {
      setProductData([]);
      getProductData();
    }
  };
  console.log(productData);

  return (
    <section className="mx-4">
      <div className="flex justify-end m-4 ">
        <ProductFilter updateRating={updateRating} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2  gap-y-4">
        {filteredProducts.map((data, index) => (
          <ProductCard key={index} {...data} />
        ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {noResults && (
          <div className="col-span-full text-center py-8">
            <EmptySearch />.
          </div>
        )}
        {!isLoading && hasMore && (
          <div className="col-span-full flex justify-center">
            <Button onClick={handleInfiniteScroll}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 size-4" /> Loading
                </>
              ) : (
                <>Load More</>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
