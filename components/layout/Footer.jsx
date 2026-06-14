"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`${
        pathname === "/signin" || pathname === "signup" ? "hidden" : "flex"
      } flex-col md:flex-row bg-black text-white py-8 px-5 md:px-20`}
    >
      <div className="flex flex-col gap-3 md:w-3/4">
        <h1 className="text-lg font-bold">Eventrouz</h1>
        <div className="flex gap-2">
          <Link href="">
            <Image
              src="https://thesvg.org/icons/instagram/default.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="">
            <Image
              src="https://thesvg.org/icons/facebook/default.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
      <div className="flex mt-5 md:mt-0 md:w-1/4 lg:w-[20%] md:justify-between lg:justify-end lg:gap-10 lg:mx-auto">
        <div className="flex flex-col">
          <ul className="flex flex-col gap-2 text-[13px] md:text-xs font-sans font-light cursor-pointer">
            <li className="font-semibold">Linkes</li>
            <li>Home</li>
            <li>Service</li>
            <li>Highlight</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-2 text-[13px] md:text-xs font-sans font-light cursor-pointer">
            <li className="font-semibold">Legal & Terms</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Security</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
