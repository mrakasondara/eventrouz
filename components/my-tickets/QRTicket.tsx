"use client";

import { useQRCode } from "next-qrcode";

export const QRTicket = ({ ticket_code }: { ticket_code: string }) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={ticket_code ?? ""}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 2,
        width: 110,
      }}
    />
  );
};
