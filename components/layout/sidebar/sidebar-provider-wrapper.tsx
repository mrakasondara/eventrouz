"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/lib/store";
import { SidebarMobileSync } from "./sidebar-mobile-sync";

export const SidebarProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isOpen, setOpen } = useSidebarStore();
  return (
    <SidebarProvider
      open={isOpen}
      onOpenChange={setOpen}
      className="min-h-screen w-full flex"
    >
      <SidebarMobileSync />
      {children}
    </SidebarProvider>
  );
};
