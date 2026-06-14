import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans, Lilita_One, Chewy } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
  display: "swap", // Improves performance
});

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap", // Improves performance
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
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        "font-sans",
        notoSans.variable,
        chewy.variable,
        lilita.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
