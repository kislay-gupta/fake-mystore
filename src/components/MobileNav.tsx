import React, { useState } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { menuLink } from "@/constant";
import { Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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

const MobileNav: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;

  const { cart, handleQuantityChange, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [closeMenu, setCloseMenu] = useState(false);
  const handleLinkClick = (route: string) => {
    navigate(route);
    setCloseMenu(false);
  };

  return (
    <nav className="lg:hidden sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg">
      <div className="mx-4 my-auto flex px-4">
        <div className="flex justify-between h-24 w-full items-center">
          <div>
            <Link to="/" className="">
              <img alt="logo" className="lg:object-contain" src="/logo.png" />
            </Link>
          </div>
          <div className="flex justify-between gap-2">
            <div className="my-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex my-auto">
                    <div className="relative mb-3">
                      <div className="t-0 absolute left-3">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                          {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="file: mt-4 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </div>
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
                            className="col-span-1 h-16 w-16 object-cover"
                          />
                          <div className="col-span-3">
                            <h3 className="font-normal truncate">
                              {product.title}
                            </h3>
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
                    <SheetFooter className="flex gap-2 justify-between">
                      <SheetClose asChild>
                        <Button type="submit">Close</Button>
                      </SheetClose>
                      <Button onClick={clearCart}>Clear Cart</Button>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
            <div className="my-auto">
              <Sheet open={closeMenu} onOpenChange={setCloseMenu}>
                <SheetTrigger asChild>
                  <span className="flex m-auto ml-4">
                    <Menu />
                  </span>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader></SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col font-semibold text-xl mt-10 gap-1 items-ends">
                      {menuLink.map((data, index) => {
                        const isActive = pathname === data.route;
                        return (
                          <NavLink
                            className={
                              isActive
                                ? "bg-neutral-600 text-white text-center  px-6 py-3 rounded-md"
                                : " text-black text-center  px-6 py-3 "
                            }
                            key={index}
                            to={data.route}
                            onClick={() => handleLinkClick(data.route)}
                          >
                            {data.label}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      <div className="w-max mx-auto relative">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          placeholder="Search product"
          className="w-full max-w-[512px] pl-9"
          onChange={(e) => setSearchParams({ search: e.target.value })}
        />
      </div>
    </nav>
  );
};

export default MobileNav;
