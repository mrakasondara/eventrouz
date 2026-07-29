"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/lib/store";

export const SidebarMobileSync = () => {
  const { setOpenMobile, isMobile } = useSidebar();
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(isOpen);
    }
  }, [isOpen, isMobile, setOpenMobile]);

  return null;
};
