import { Pin, QrCode, Scissors, Ticket } from "lucide-react";
import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { TicketInOrder } from "@/types/order";
import { Button } from "@/components/ui/button";

export const QRDialog = ({
  event_ticket_date,
  event_title,
  ticket_category_name,
  ticket_code,
  quantity,
}: TicketInOrder) => {
  const { Canvas } = useQRCode();

  const handleDownloadQR = () => {
    const canvas = document
      .getElementById("qr-wrapper")
      ?.querySelector("canvas");

    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr_tiket_${ticket_code}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="mt-1 flex gap-2 text-sm underline cursor-pointer" />
        }
      >
        <QrCode size={20} />
        Lihat QR Code
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-2xl shadow-[8px_8px_0px_0px_#323232] transition-all ease-in-out border-8 font-grotesk p-0">
        <DialogHeader className="w-full p-1 text-lg text-center font-semibold hidden">
          QR Code Tiket
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-3 md:w-1/2 p-6">
            <p className="px-2 py-1 bg-black text-white text-lg font-bold uppercase self-start">
              {ticket_category_name}
            </p>
            <h1 className="text-4xl uppercase font-bold">{event_title}</h1>

            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-5 font-jakarta">
              <div className="flex flex-col gap-1">
                <p className="uppercase text-slate-500 text-xs font-semibold">
                  Jumlah Tiket
                </p>
                <h2 className="uppercase text-lg font-extrabold">
                  {quantity} Tiket
                </h2>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <p className="flex uppercase text-slate-500 text-xs font-semibold items-center">
                  <Ticket className="mr-1" size={16} /> Tanggal & Waktu Tiket
                </p>
                <h2 className="uppercase text-lg font-extrabold">
                  {event_ticket_date}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex uppercase text-slate-500 text-xs font-semibold items-center">
                  <Pin className="mr-1" size={16} /> Lokasi / Venue
                </p>
                <h2 className="uppercase text-lg font-extrabold">
                  stadion utama gbk
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col bg-blue items-center justify-center font-jakarta py-8 border-t-4 md:border-t-0 md:border-l-4 border-dashed">
            <div className="mb-6 flex flex-col text-center gap-1">
              <p className="uppercase font-semibold">Kode Tiket</p>
              <h6 className="text-lg bg-white px-3 py-1 self-start border-2 font-extrabold">
                {ticket_code}
              </h6>
            </div>
            <div
              id="qr-wrapper"
              className="inline-block border-4 p-4 bg-white shadow-[5px_5px_0px_0px_#323232]"
            >
              <Canvas
                text={ticket_code ?? ""}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 0,
                  width: 200,
                }}
              />
            </div>

            <Button
              size="lg"
              variant="brutalism"
              className="mt-5"
              onClick={handleDownloadQR}
            >
              Download QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
