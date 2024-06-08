import { useMemo } from "react";
import { ProductProps } from "@/constant";

const useSearch = (data: ProductProps[], searchQuery: string) => {
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const searchTerm = searchQuery.toLowerCase();

    return data.filter(({ title, description, category }) => {
      return (
        title.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm) ||
        category.toLowerCase().includes(searchTerm)
      );
    });
  }, [data, searchQuery]);

  return filteredData;
};

export default useSearch;
