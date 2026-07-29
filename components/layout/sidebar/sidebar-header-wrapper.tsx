import { SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SidebarHeaderWrapper = () => {
  return (
    <SidebarHeader className="flex px-5 py-[.83rem] gap-1 items-center border-b-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/images/icon.png"
            className="h-[30px] scale-200"
            alt="icon"
          />
          <h1 className="font-bold">Eventrouz</h1>
        </div>
        <Button className="border-0 w-[44px] bg-transparent hover:bg-transparent text-black cursor-pointer">
          <Search className="size-6" />
        </Button>
      </div>
    </SidebarHeader>
  );
};
