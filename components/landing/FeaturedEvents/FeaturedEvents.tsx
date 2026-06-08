import { FeaturedCard } from "./FeaturedCard";

export const FeaturedEvents = () => {
  return (
    <section className="flex flex-col font-grotesk border-b-2 bg-white">
      <div className="flex bg-[#091413] justify-center px-5 pt-15 pb-30 relative">
        <h2 className="font-grotesk text-5xl text-center uppercase font-bold text-white">
          Beberapa
          <br />{" "}
          <span className="inline-block mt-1 bg-red-600 p-1">
            Event Pilihan
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:w-3/4 lg:w-1/2 gap-5 -mt-15 pb-30 z-10 mx-auto px-5">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>
      <p>Lihat event lainnya</p>
    </section>
  );
};
