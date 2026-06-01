import { Button } from "../ui/button";
import { TicketCard } from "./TicketCard";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full md:relative lg:static border border-b-5 bg-beige">
      <div className="flex flex-col py-15 px-5 gap-5 w-full lg:w-3/4 lg:mx-auto bg-beige">
        <div className="flex w-full justify-between md:static lg:relative">
          <h2 className="text-[4rem] md:leading-26 lg:leading-28 md:text-[5rem] lg:text-[6rem] lg:w-3/4 font-grotesk font-extrabold">
            Tremendous Events Experience.
          </h2>
          <TicketCard />
        </div>
        <p className="font-sans w-1/2 text-sm font-semibold">
          Eventrouze menghadirkan pengalaman luar biasa lebih dekat kepada Anda.
          Jelajahi acara menarik, amankan tiket Anda, dan ciptakan kenangan tak
          terlupakan.
        </p>
        <Button
          variant="brutalism"
          size="lg"
          className="w-[30%] md:w-[20%] text-lg"
        >
          Join Us
        </Button>
      </div>
      {/* <TicketCard /> */}
    </div>
  );
};
