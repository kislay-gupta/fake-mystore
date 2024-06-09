import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ProductProps, CartProductProps } from "@/constant";
import { Button } from "../ui/button";
import { LucideShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

export const ProductCard = ({
  id,
  description,
  image,
  price,
  rating,
  title,
  category,
}: ProductProps) => {
  const handleAddToCart = () => {
    const product = { id, description, image, price, rating, title, category };

    const storedCart = localStorage.getItem("cart");
    const cart: CartProductProps[] = storedCart ? JSON.parse(storedCart) : [];

    const productIndex = cart.findIndex((item) => item.id === product.id);
    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      const newProduct: CartProductProps = { ...product, quantity: 1 };
      cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`Product added to cart: ${product.title}`);
  };

  return (
    <Card className="w-80 hover:scale-105 transition hover:shadow-lg">
      <Link to={`/product/${id}`} className="">
        <CardHeader>
          <img
            src={image}
            loading="lazy"
            className="h-24 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-48"
          />
          <Link
            className="capitalize text-blue-500 hover:text-blue-800"
            to={`/category/${category}`}
          >
            {category}
          </Link>
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <span className="flex">
            <Star className="size-4 text-amber-500 fill-amber-500 my-auto" />{" "}
            {rating.rate}
          </span>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price}
        </h3>
        <Button onClick={handleAddToCart}>
          <LucideShoppingCart className="mr-2" /> Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
