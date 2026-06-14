import { stepsItem } from "../../lib/stepsItem";

export const Steps = () => {
  return (
    <section className="flex gap-40 flex-col justify-center items-center py-40 px-5 font-chewy border-b-3 bg-purple-600">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-7xl uppercase text-white">
          Pesan Tiket Dalam 4 Langkah
        </h2>
        <p className="md:w-1/2 mx-auto text-lg  text-[#E0E0E0] font-grotesk capitalize">
          "Mulai perjalananmu menuju pengalaman event yang luar biasa dengan
          proses pemesanan yang sederhana dan cepat."
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-0 justify-center items-center">
        {stepsItem.map((step, index) => {
          return <StepCard {...step} key={index} />;
        })}
      </div>
    </section>
  );
};

const StepCard = ({
  title,
  bgColor,
  icon,
  rotate,
}: {
  title: string;
  bgColor: string;
  icon: any;
  rotate: string;
}) => {
  const Icon = icon;
  return (
    <div
      className={`flex flex-col justify-between gap-5 border-border ${bgColor} ${rotate} w-60 lg:w-70 h-50 p-4 border-2 uppercase font-bold -translate-y-[1px] hover:translate-[3px] hover:shadow-none shadow-[10px_10px_0px_0px_black] transition`}
    >
      <Icon size={60} strokeWidth={2.5} color={"#323232"} />
      <h4 className="text-3xl text-[#323232]">{title}</h4>
    </div>
  );
};
