import Image from "next/image";

const usersDummy = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    alt: "Pengguna Eventrouz 1",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    alt: "Pengguna Eventrouz 2",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    alt: "Pengguna Eventrouz 3",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    alt: "Pengguna Eventrouz 4",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    alt: "Pengguna Eventrouz 5",
  },
];

export const LeftSection = () => {
  return (
    <div className="relative flex flex-col justify-center border-b-2 border-[#18181b] bg-beige px-6 pb-[8rem] md:pb-[10rem] lg:pb-[12rem] pt-[10rem] md:pt-[10rem] lg:pt-[12rem] lg:border-b-0 lg:border-r-2">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#18181b] sm:text-5xl xl:text-[54px]">
          Pesan tiket event favoritmu, diproses
          <span className="mt-1 block w-36 md:w-auto md:inline-block bg-[#A855F7] px-3 py-1 text-white shadow-[3px_3px_0px_0px_#18181b]">
            instan!
          </span>
        </h1>
      </div>

      <div className="mt-11 mx-auto">
        <p className="text-sm font-bold text-[#18181b]/90 sm:text-base">
          Dipercaya lebih dari 50.000+ pencinta konser &amp; seminar
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex -space-x-3.5">
            {usersDummy.map((user) => (
              <Image
                key={user.id}
                src={user.image}
                alt={user.alt}
                className="h-12 w-12 rounded-full border-[2.5px] border-white object-cover shadow-sm"
                width={48}
                height={48}
                loading="lazy"
              />
            ))}
          </div>

          <div className="flex items-center gap-3.5 rounded-full border border-[#18181b]/15 bg-white py-2 pl-2.5 pr-5 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt="Rina Putri"
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[#A855F7]/20"
              width={48}
              height={48}
              loading="lazy"
            />
            <div className="text-xs leading-snug sm:text-[13px]">
              <p className="font-bold text-[#18181b]">
                &ldquo;E-Ticket QR langsung terbit, anti antre!&rdquo;
              </p>
              <p className="mt-0.5 font-extrabold text-[#A855F7]">Rina Putri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
