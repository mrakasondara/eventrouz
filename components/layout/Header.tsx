"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { toast } from "sonner";

export const Header = () => {
  const pathname = usePathname();

  const { data: session } = useSession();
  return (
    <header
      className={`${
        pathname === "/signin" || pathname === "/signup" ? "hidden" : "flex"
      } w-full py-3 px-5 border-b-4 items-center`}
    >
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
          {session && (
            <>
              <Button
                variant="brutalism"
                className="bg-red-500 text-white border-black"
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
                    toast.error(response.message);
                  }
                }}
              >
                Logout
              </Button>
              <Button variant="brutalism" size="icon-sm">
                <ShoppingCart />
              </Button>
              {pathname != "/" && (
                <>
                  <Button variant="brutalism" size="icon-sm">
                    <Search />
                  </Button>
                  <Button variant="brutalism" size="icon-sm">
                    <Menu />
                  </Button>
                </>
              )}
            </>
          )}
          {pathname === "/" && (
            <Link href="/signin">
              <Button variant="brutalism" size="sm">
                Join Us
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
