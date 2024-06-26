import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { menuLink } from "@/constant";
import { Search, ShoppingCartIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

const Navbar: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { cart, handleQuantityChange, removeFromCart, clearCart } = useCart();

  return (
    <nav className="hidden lg:block sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg">
      <div className="mx-4 my-auto flex px-4">
        <div className="grid h-24 w-full grid-cols-12 items-center">
          <div className="col-span-6 lg:col-span-2">
            <Link to="/" className="">
              <img alt="logo" className="lg:object-contain" src="/logo.png" />
            </Link>
          </div>
          <div className="lg:col-span-4 mx-auto hidden space-x-4 text-lg dark:text-white md:block">
            {menuLink.map((data, index) => (
              <Link key={index} to={data.route}>
                {data.label}
              </Link>
            ))}
          </div>
          <div className="col-span-6 relative hidden md:block">
            <div className="flex justify-start gap-1">
              <div className="w-[512px] relative">
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Search product"
                  className="w-full max-w-[512px] pl-9"
                  onChange={(e) => setSearchParams({ search: e.target.value })}
                />
              </div>
              <div>
                <Separator
                  className="bg-black/50 h-auto"
                  orientation="vertical"
                />
              </div>
              <div>
                <Button>Log In</Button>
              </div>
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <ShoppingCartIcon />
                      <span className="ml-2">
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Shopping Cart</SheetTitle>
                      <SheetDescription>
                        Here are the items in your cart.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                      ) : (
                        cart.map((product) => (
                          <div
                            key={product.id}
                            className="grid grid-cols-4 gap-4 items-center"
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="col-span-1 h-16 w-16 object-contain"
                            />
                            <div className="col-span-3">
                              <h3 className="font-medium">{product.title}</h3>
                              <p className="text-base text-gray-500">
                                ${product.price} x {product.quantity} = $
                                {product.quantity * product.price}
                              </p>
                              <div className="flex gap-2 items-center">
                                <Button
                                  size="icon"
                                  onClick={() =>
                                    handleQuantityChange(product.id, -1)
                                  }
                                  className=""
                                >
                                  -
                                </Button>
                                <Button
                                  size="icon"
                                  onClick={() =>
                                    handleQuantityChange(product.id, 1)
                                  }
                                >
                                  +
                                </Button>
                                <Button
                                  size="icon"
                                  onClick={() => removeFromCart(product.id)}
                                  className=""
                                >
                                  x
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {cart.length > 0 && (
                      <SheetFooter className="flex justify-between">
                        <Button onClick={clearCart}>Clear Cart</Button>
                        <SheetClose asChild>
                          <Button type="submit">Close</Button>
                        </SheetClose>
                      </SheetFooter>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
