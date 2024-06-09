import { useEffect, useState } from "react";
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
import { sortProducts } from "@/lib/utils";
import SortDropdown from "@/components/SortDropdown";

const Home = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [searchParams] = useSearchParams();

  const [pageLimit, setPageLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchQuery = searchParams.get("search") || "";
  const [sortCriteria, setSortCriteria] = useState("");

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

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
    const sortedProducts = sortProducts(productData, criteria);
    setProductData(sortedProducts);
  };

  useEffect(() => {
    getProductData();
  }, [pageLimit, searchQuery]);

  const filteredProducts = useSearch(productData, searchQuery); // Use the custom hook
  const noResults = !isLoading && filteredProducts.length === 0;

  console.log(productData);

  return (
    <div className="m-4">
      <div className="flex mb-4 lg:justify-end">
        <SortDropdown
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-2  gap-y-4">
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
    </div>
  );
};

export default Home;
