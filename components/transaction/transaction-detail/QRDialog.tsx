import { QrCode } from "lucide-react";
import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

export const QRDialog = ({
  ticket_code,
}: {
  ticket_code: string | undefined;
}) => {
  const { Canvas } = useQRCode();

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
      <DialogContent className="sm:max-w-md shadow-[8px_8px_0px_0px_#323232] hover:shadow-[4px_4px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader className="w-full p-1 text-lg text-center font-semibold">
          QR Code Tiket
        </DialogHeader>
        <div className="flex flex-col gap-5 items-center">
          <Canvas
            text={ticket_code ?? ""}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 5,
              width: 200,
              color: {
                dark: "#010599FF",
                light: "#FFBF60FF",
              },
            }}
          />
          <h6 className="text-lg">{ticket_code}</h6>
        </div>
      </DialogContent>
    </Dialog>
  );
};
