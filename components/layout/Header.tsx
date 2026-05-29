import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex w-full p-3 border-b-4 items-center">
      <div className="flex w-full lg:w-3/4 mx-auto">
        <h1 className="text-2xl font-bold text-main">Eventrouz</h1>
        <div className="flex gap-2 ml-auto justify-end items-center">
          <Button variant="brutalism" size="icon-sm">
            <Search />
          </Button>
          <Button variant="brutalism" size="icon-sm">
            <ShoppingCart />
          </Button>
          <Button variant="brutalism" size="icon-sm">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};
