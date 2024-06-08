import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import EmptySearch from "@/components/EmptySearch";

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

  const searchFunction = ({ title, description, category }: ProductProps) => {
    if (!searchQuery) return true;
    const searchTerm = searchQuery.toLowerCase();
    let found = title.toLowerCase().includes(searchTerm);
    found = found || category.toLowerCase().includes(searchTerm);
    found = found || description.toLowerCase().includes(searchTerm);
    return found;
  };

  const filteredProducts = productData.filter(searchFunction);
  const noResults = !isLoading && filteredProducts.length === 0;

  console.log(productData);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 mx-4 gap-y-4">
      {filteredProducts.map((data, index) => (
        <ProductCard key={index} {...data} />
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      {noResults && (
        <div className="col-span-full text-center py-8">
          <EmptySearch />
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
  );
};

export default Home;
