import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductProps, url } from "@/constant";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useParams, useSearchParams } from "react-router-dom";
import useSearch from "@/hooks/useSearch"; // Import the custom hook
import { sortProducts } from "@/lib/utils";
import SortDropdown from "@/components/SortDropdown"; // Import the SortDropdown component

const Category = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [pageLimit, setPageLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams(); // Use useSearchParams to get the search query
  const searchQuery = searchParams.get("search") || ""; // Get the search query from the URL
  const [sortCriteria, setSortCriteria] = useState("");

  const handleInfiniteScroll = () => {
    if (pageLimit >= 21) {
      toast.error("No more products to scroll");
      setHasMore(false);
      return;
    }
    setPageLimit((prevLimit) => prevLimit + 8);
  };

  const getCategoryDetail = () => {
    setLoading(true);
    axios
      .get(`${url}/category/${id}?limit=${pageLimit}`)
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
    getCategoryDetail();
  }, [pageLimit, id]);

  const filteredProducts = useSearch(productData, searchQuery);
  const noResults = !isLoading && filteredProducts.length === 0;

  return (
    <div className="m-4">
      <div className="flex justify-end mb-4">
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
            No products found.
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

export default Category;
