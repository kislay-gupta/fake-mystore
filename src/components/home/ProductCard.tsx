import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductProps } from "@/constant";
import { Button } from "../ui/button";
import { LucideShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export const ProductCard: React.FC<ProductProps> = ({
  id,
  description,
  image,
  price,
  rating,
  title,
  category,
  quantity,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product: ProductProps = {
      id,
      description,
      image,
      price,
      rating,
      title,
      category,
      quantity,
    };
    addToCart(product);
    toast.success(`Product added to cart: ${product.title}`);
  };
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      className="max-w-sm rounded relative w-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: id * 0.1,
        ease: "easeInOut",
        duration: "0.5",
      }}
      viewport={{ amount: 0 }}
    >
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
    </motion.div>
  );
};
