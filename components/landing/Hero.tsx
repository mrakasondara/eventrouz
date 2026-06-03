import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { TicketCard } from "./TicketCard";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full md:relative lg:static border border-b-2 bg-beige">
      <div className="flex items-center md:items-start gap-y-10 md:gap-y-5 flex-col py-15 px-5 gap-x-5 w-full lg:w-3/4 lg:mx-auto bg-beige">
        <div className="flex w-full justify-between md:static lg:relative">
          <h2 className="text-[4rem] leading-20 text-center md:text-start md:leading-26 lg:leading-28 md:text-[5rem] lg:text-[6rem] w-full lg:w-3/4 font-grotesk font-extrabold">
            Tremendous Events Experience.
          </h2>
          <TicketCard />
        </div>
        <p className="font-sans w-full text-center md:text-start md:w-1/2 text-sm font-semibold">
          Eventrouze menghadirkan pengalaman luar biasa lebih dekat kepada Anda.
          Jelajahi acara menarik, amankan tiket Anda, dan ciptakan kenangan tak
          terlupakan.
        </p>
        <Button
          variant="brutalism"
          size="lg"
          className="w-[30%] md:w-[20%] flex gap-2 -rotate-5 hover:rotate-0 text-lg"
        >
          <ArrowRight />
          <span>Join Us</span>
        </Button>
      </div>
    </div>
  );
};
