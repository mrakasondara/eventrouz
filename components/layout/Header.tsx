"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart, Search, Menu, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { toast } from "sonner";
import { useSidebarStore } from "@/lib/store";
import { SearchDialog } from "./SearchDialog";

export const Header = () => {
  const pathname = usePathname();
  const toggle = useSidebarStore((s) => s.toggle);
  const { isOpen } = useSidebarStore();

  const { data: session } = useSession();

  if (pathname === "/signin" || pathname === "/signup") return;

  return (
    <header className="flex w-full py-3 px-5 border-b-4 bg-white items-center fixed top-0 left-0 z-50">
      <div className="flex w-full items-center lg:w-3/4 mx-auto">
        <div className="flex gap-1 items-center">
          <img
            src="/images/icon.png"
            className="h-[40px] scale-200"
            alt="icon"
          />
          <h1 className="text-xl font-bold">Eventrouz</h1>
        </div>
        <div className="flex gap-2 ml-auto justify-end items-center">
          {!session && (
            <Link href="/signin" className={`${session ? "hidden" : "block"}`}>
              <Button variant="brutalism" size="sm">
                Join Us
              </Button>
            </Link>
          )}

          {session && (
            <Button
              variant="brutalism"
              className="hidden md:block bg-red-500 text-white border-black"
              size="sm"
              onClick={async () => {
                const token = await getAccessToken();
                const response = await EventsAPI.logout(token);
                if (response.success) {
                  toast.success(response.message);
                  setTimeout(() => {
                    signOut({ callbackUrl: "/signin" });
                  }, 700);
                } else {
                  signOut({ callbackUrl: "/signin" });
                }
              }}
            >
              Logout
            </Button>
          )}

          <Link
            href={pathname === "/" ? "/events" : "/"}
            className="hidden md:block"
          >
            <Button variant="brutalism" size="sm" className="bg-blue">
              {pathname === "/" ? "Cari Event" : "Beranda"}
            </Button>
          </Link>

          {session && (
            <Button variant="brutalism" size="icon-sm">
              <ShoppingCart />
            </Button>
          )}

          {pathname != "/" && (
            <>
              <SearchDialog />
              <Button variant="brutalism" size="icon-sm" onClick={toggle}>
                {isOpen ? <XIcon /> : <Menu />}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
