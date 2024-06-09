import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-80">
      <CardHeader>
        <Skeleton className="h-24 w-full sm:h-48" />
        <Skeleton className="h-6 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-full mt-1" />
      </CardHeader>
      <CardContent className="flex">
        <Skeleton className="h-6 w-16 mt-2" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
