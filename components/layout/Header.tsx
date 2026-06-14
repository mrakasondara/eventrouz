"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  return (
    <header
      className={`${
        pathname === "/signin" || pathname === "/signup" ? "hidden" : "flex"
      } w-full py-3 px-5 border-b-4 items-center`}
    >
      <div className="flex w-full lg:w-3/4 mx-auto">
        <h1 className="text-2xl font-bold">Eventrouz</h1>
        <div className="flex gap-2 ml-auto justify-end items-center">
          {pathname != "/" && (
            <Button variant="brutalism" size="icon-sm">
              <Search />
            </Button>
          )}
          {isAuth && (
            <Button variant="brutalism" size="icon-sm">
              <ShoppingCart />
            </Button>
          )}
          <Button variant="brutalism" size="sm">
            Join Us
          </Button>
          <Button variant="brutalism" size="icon-sm">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};
