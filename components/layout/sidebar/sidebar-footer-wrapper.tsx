"use client";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
export const SidebarFooterWrapper = () => {
  const { data: session } = useSession();

  return (
    <SidebarFooter className="mb-5 px-3 font-grotesk">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-blue hover:border-2 hover:border-black p-2 hover:shadow-[2px_2px_0px_0px_#323232] cursor-pointer transition-all ease-in">
          <div className="flex items-center">
            <Avatar size="lg">
              <AvatarImage src={session?.user?.image || ""} alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-2 text-start text-sm">
              <h4>{session?.user?.name}</h4>
              <p>{session?.user?.email}</p>
            </div>
            <EllipsisVertical size={20} className="my-auto ml-auto" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-2 shadow-[2px_2px_0px_0px_#323232]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-red-500 hover:text-white hover:border-2 hover:border-black"
              onClick={async () => {
                const token = await getAccessToken();
                const response = await EventsAPI.logout(token);
                if (response.success) {
                  toast.success(response.message);
                  setTimeout(() => {
                    signOut({ callbackUrl: "/signin" });
                  }, 700);
                } else {
                  toast.error(response.message);
                }
              }}
            >
              logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
};
