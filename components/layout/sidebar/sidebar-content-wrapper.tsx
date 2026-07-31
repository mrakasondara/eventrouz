import Link from "next/link";
import { LayoutDashboard, List, TicketCheck, User } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export const SidebarContentWrapper = (data: any) => {
  const pathActive = usePathname();
  const authLinks = [
    {
      path: "/tickets",
      title: "tiket saya",
      icon: TicketCheck,
    },
    {
      path: "/transactions",
      title: "riwayat transaksi",
      icon: List,
    },
  ];

  const accountLinks = [
    {
      path: "/profile",
      title: "profil & keamanan",
      icon: User,
    },
  ];

  return (
    <SidebarContent className="mt-4 font-grotesk">
      <SidebarGroup>
        <SidebarGroupLabel className="text-lg mb-3">Main</SidebarGroupLabel>

        <div className="flex flex-col w-full gap-2 px-2 list-none">
          <SidebarMenuItem>
            <Link href="/events">
              <SidebarMenuButton
                className={`gap-5 text-md ${
                  pathActive == "/events" &&
                  "bg-blue border-2 font-semibold shadow-[3px_3px_0px_0px_#323232]"
                } hover:border-2 hover:bg-blue hover:shadow-[3px_3px_0px_0px_#323232] transition-all ease-in-out capitalize cursor-pointer`}
              >
                <LayoutDashboard /> Beranda
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          {data.session &&
            authLinks.map((link) => {
              const Icon = <link.icon />;
              return (
                <SidebarMenuItem key={link.title}>
                  <Link href={link.path}>
                    <SidebarMenuButton
                      className={`gap-5 text-md ${
                        pathActive == link.path &&
                        "bg-blue border-2 font-semibold shadow-[3px_3px_0px_0px_#323232]"
                      } hover:border-2 hover:bg-blue hover:shadow-[3px_3px_0px_0px_#323232] transition-all ease-in-out capitalize cursor-pointer`}
                    >
                      {Icon}
                      {link.title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
        </div>
      </SidebarGroup>

      {data.session && (
        <SidebarGroup>
          <SidebarSeparator className="border mt-4" />
          <SidebarGroupLabel className="text-lg mt-4 mb-3">
            Akun
          </SidebarGroupLabel>

          <div className="flex flex-col w-full gap-2 px-2 list-none">
            {accountLinks.map((link) => {
              const Icon = <link.icon />;
              return (
                <SidebarMenuItem key={link.title}>
                  <Link href={link.path}>
                    <SidebarMenuButton
                      className={`gap-5 text-md ${
                        pathActive == link.path &&
                        "bg-blue border-2 font-semibold shadow-[3px_3px_0px_0px_#323232]"
                      } hover:border-2 hover:bg-blue hover:shadow-[3px_3px_0px_0px_#323232] transition-all ease-in-out capitalize cursor-pointer`}
                    >
                      {Icon}
                      {link.title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </div>
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};
