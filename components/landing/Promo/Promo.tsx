import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <section className="flex gap-2 flex-col justify-center items-center py-30 px-5 font-chewy border-b-3 bg-cover bg-center bg-[url('/images/promo.jpg')] font-lilita">
      <h2 className="text-6xl md:text-7xl uppercase [text-shadow:5px_5px_1px_rgba(0,0,0,1)] text-white text-center font-extrabold">
        biggest summer <br />{" "}
        <span className="text-yellow-400">festival 2026!</span>
      </h2>
      <h3 className="text-xl md:text-3xl font-extralight text-center font-lilita border-3 bg-purple-400 p-2 shadow-[0px_6px_0px_0px_black]">
        Diskon hingga 15% untuk tiket Early Bird!
      </h3>
      <Button className="uppercase border-3 border-black hover:bg-red-500 cursor-pointer -translate-y-[1px] hover:translate-y-[3px] hover:shadow-none shadow-[0px_6px_0px_0px_black] rounded-md text-xl md:text-3xl mt-6 p-3 h-auto bg-red-500">
        pesan sekarang!
      </Button>
    </section>
  );
};
