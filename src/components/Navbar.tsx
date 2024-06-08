import { menuLink } from "@/constant";
import { Search, ShoppingBag } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <nav className="sticky top-0 z-50  bg-white/30 dark:bg-black/30  backdrop-blur-lg ">
      <div className="mx-4 my-auto  flex px-4">
        <div className="grid h-24 w-full grid-cols-12 items-center ">
          <div className="col-span-6  lg:col-span-2 ">
            <Link to="/" className="">
              <img
                alt="facebook icon"
                className=" lg:object-contain "
                src="/logo.png"
              />{" "}
            </Link>
          </div>
          <div className="lg:col-span-4 mx-auto  hidden space-x-4 text-lg  dark:text-white md:block">
            {menuLink.map((data, index) => {
              return (
                <Link key={index} to={data.route}>
                  {data.label}
                </Link>
              );
            })}
            {/* <a href="#">Service</a>
            <a href="#">Contact</a>
            <a href="#">Contact</a> */}
          </div>
          <div className=" col-span-6 relative     hidden md:block">
            {/* <ModeToggle /> */}
            <div className="flex justify-start gap-1 ">
              <div className=" w-[512px] relative">
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Search product"
                  className="w-full max-w-[512px] pl-9"
                  onChange={(e) => setSearchParams({ search: e.target.value })}
                />
              </div>
              <div>
                <Separator
                  className="bg-black/50 h-auto "
                  orientation="vertical"
                />
              </div>

              <div>
                <Button>Log In</Button>
              </div>
              <div>
                <Button size="icon">
                  <ShoppingBag />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- End Navbar with Topbar--> */}
    </nav>
  );
};

export default Navbar;
