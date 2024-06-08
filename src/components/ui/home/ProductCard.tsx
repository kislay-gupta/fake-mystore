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
import { ProductProps } from "@/constant";
import { Button } from "../button";
import { Star } from "lucide-react";

export const ProductCard = ({
  id,
  description,
  image,
  price,
  rating,
  title,
}: ProductProps) => {
  return (
    <Card className="w-80">
      <Link to={`/${id}`} className="hover:">
        <CardHeader>
          <img
            src={image}
            className="h-24 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-48"
          />
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-green-500 flex">
          <Star className="size-4 fill-green-500 my-auto" /> {rating.rate}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price}
        </h3>
        <Button>Add to card</Button>
      </CardFooter>
    </Card>
  );
};
