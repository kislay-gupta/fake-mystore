import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductProps, url } from "@/constant";
import { useCart } from "@/contexts/CartContext";
import ProductPageSkelton from "@/components/Loaders/ProductPageSkelton";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [productDetail, setProductDetail] = useState<ProductProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isNotFavorite, setIsNotFavorite] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleIsFavorite = () => {
    setIsNotFavorite(!isNotFavorite);
    toast.success(
      isNotFavorite ? "Added to Favorite" : "Removed from Favorite"
    );
  };

  const handleAddToCart = () => {
    if (productDetail) {
      setAddingToCart(true);
      addToCart(productDetail);
      toast.success(`Product added to cart: ${productDetail.title}`);
      setAddingToCart(false);
    }
  };

  const getProductDetail = () => {
    setLoading(true);
    axios
      .get(`${url}/${id}`)
      .then((response) => {
        setProductDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  return (
    <div>
      {isLoading && <ProductPageSkelton />}
      {!isLoading && productDetail && (
        <div>
          <div
            className="container px-5 py-10 mx-auto"
            style={{ cursor: "auto" }}
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                src={productDetail.image}
                style={{ cursor: "auto" }}
              />
              <div
                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                style={{ cursor: "auto" }}
              >
                <h2
                  className="text-sm title-font text-gray-500 tracking-widest"
                  style={{ cursor: "auto" }}
                >
                  ON SALE
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ cursor: "auto" }}
                >
                  {productDetail.title}
                </h1>
                <Link
                  className="text-blue-500"
                  to={`/category/${productDetail.category}`}
                >
                  {productDetail.category}
                </Link>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {productDetail.rating.rate}
                    <span className="text-gray-600 ml-3">
                      {productDetail.rating.count} Reviews
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">{productDetail.description}</p>

                <div className="flex mt-4">
                  <span className="my-auto title-font font-medium text-2xl text-gray-900">
                    ${productDetail.price}
                  </span>
                  <Button
                    disabled={addingToCart}
                    onClick={handleAddToCart}
                    className="ml-auto text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    {addingToCart ? (
                      <>
                        <Loader2 className="animate-spin size-4 mr-2" /> Adding
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                  <button
                    onClick={handleIsFavorite}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <Heart
                      className={isNotFavorite ? "" : "fill-black text-black"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
``;
