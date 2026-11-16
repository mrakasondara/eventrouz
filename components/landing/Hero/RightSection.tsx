import Link from "next/link";
import { QrCode, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RightSection = () => {
  return (
    <div className="flex flex-col justify-center bg-[#D5EAE0] px-6 sm:px-12 lg:px-16 pb-[8rem] md:pb-[10rem] lg:pb-[12rem] pt-[10rem] md:pt-[10rem] lg:pt-[12rem]">
      <div className="mx-auto w-full max-w-md mt-7 lg:mt-15">
        <ol className="space-y-6 sm:space-y-7">
          <li className="flex items-start gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#18181b] text-xs font-extrabold text-white">
              1
            </span>
            <p className="text-base font-semibold leading-relaxed text-[#18181b] sm:text-[17px]">
              Pilih event seru dan kategori tiket sesuai kebutuhanmu.
            </p>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#18181b] text-xs font-extrabold text-white">
              2
            </span>
            <p className="text-base font-semibold leading-relaxed text-[#18181b] sm:text-[17px]">
              Bayar aman dan cepat lewat QRIS, Virtual Account, atau E-Wallet.
            </p>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#18181b] text-xs font-extrabold text-white">
              3
            </span>
            <p className="text-base font-semibold leading-relaxed text-[#18181b] sm:text-[17px]">
              Terima E-Ticket QR otomatis dan langsung{" "}
              <span className="italic">scan</span> saat check-in!
            </p>
          </li>
        </ol>

        <div className="mt-10">
          <Link href="/events">
            <Button
              variant="brutalism"
              size="md"
              className="bg-blue text-md font-jakarta font-semibold"
            >
              Jelajahi Event
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#18181b]/75">
          <span className="flex items-center gap-1.5">
            <QrCode />
            E-Ticket Instan
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck />
            Pembayaran Terverifikasi
          </span>
        </div>
      </div>
    </div>
  );
};
