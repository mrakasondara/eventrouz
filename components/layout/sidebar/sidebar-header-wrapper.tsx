import { SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";

export const SidebarHeaderWrapper = () => {
  return (
    <SidebarHeader className="flex py-[.83rem] gap-1 items-center">
      <div className="w-full flex justify-center items-center mt-2">
        <div className="flex items-center">
          <img
            src="/images/icon.png"
            className="h-[30px] scale-200"
            alt="icon"
          />
          <h1 className="font-bold">Eventrouz</h1>
        </div>
      </div>
      <SidebarSeparator className="border mt-2 w-full ml-6" />
    </SidebarHeader>
  );
};
