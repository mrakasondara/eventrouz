"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { SidebarContentWrapper } from "./sidebar-content-wrapper";
import { SidebarHeaderWrapper } from "./sidebar-header-wrapper";
import { useSession } from "next-auth/react";
import { SidebarFooterWrapper } from "./sidebar-footer-wrapper";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname == "/") return;
  return (
    <Sidebar className="h-full border-r-4! z-20">
      <SidebarHeaderWrapper />
      <SidebarContentWrapper data={session} />

      {session && <SidebarFooterWrapper />}
    </Sidebar>
  );
};
