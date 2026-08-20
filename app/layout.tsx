import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans, Lilita_One, Chewy } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/provider";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarProviderWrapper } from "@/components/layout/sidebar/sidebar-provider-wrapper";
import { SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
  display: "swap",
});

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eventrouz - Book your event",
    template: "%s - Eventrouz",
  },
  description:
    "Eventrouze brings tremendous experiences closer to you. Explore exciting events, secure your tickets, and create unforgettable memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        spaceGrotesk.variable,
        "font-sans",
        notoSans.variable,
        chewy.variable,
        lilita.variable
      )}
    >
      <body className="min-h-screen w-full bg-background antialiased">
        <Providers>
          <SidebarProviderWrapper>
            <TooltipProvider>
              <AppSidebar />

              <SidebarInset className="flex flex-col min-h-screen w-full flex-1">
                <Header />
                <Toaster position="top-right" />

                <main className="flex-1 flex flex-col w-full min-h-full">
                  {/*  Wrapper children biarkan auto height (fleksibel) */}
                  <div className="flex-1 w-full">{children}</div>
                </main>
                <Footer />
              </SidebarInset>
            </TooltipProvider>
          </SidebarProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
