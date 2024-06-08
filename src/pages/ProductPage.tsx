import ProductPageSkelton from "@/components/Loaders/ProductPageSkelton";
import { Button } from "@/components/ui/button";
import { ProductProps, url } from "@/constant";
import axios from "axios";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductPage = () => {
  const [productDetail, setProductDetail] = useState<ProductProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [isNotFavorite, setIsNotFavorite] = useState(true);

  const handleIsFavorite = () => {
    setIsNotFavorite(!isNotFavorite);
    setTimeout(() =>
      toast.success(
        isNotFavorite ? `Added to Favorite` : `Removed from Favorite `
      )
    );
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
  }, []);

  console.log(productDetail);

  return (
    <div>
      {isLoading && <ProductPageSkelton />}
      {!isLoading && productDetail && (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <div
            className="container px-5 py-24 mx-auto"
            style={{ cursor: "auto" }}
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                src={productDetail?.image}
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
                    {productDetail?.rating.rate}
                    <span className="text-gray-600 ml-3">
                      {productDetail?.rating.count} Reviews
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{productDetail.description}</p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    $45.99
                  </span>
                  <Button className=" ml-auto text-white bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded">
                    Buy
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
