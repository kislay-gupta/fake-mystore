import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/utils/sortProducts.ts
import { ProductProps } from "@/constant";

export const sortProducts = (
  products: ProductProps[],
  criteria: string
): ProductProps[] => {
  const sortedProducts = [...products];

  switch (criteria) {
    case "lowToHighPrice":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "highToLowPrice":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "lowToHigh":
      sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    case "highToLow":
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      // If the criteria do not match, return the original order
      return products;
  }

  return sortedProducts;
};
