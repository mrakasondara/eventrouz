"use client";

import {
  CalendarDays,
  Check,
  CheckCheck,
  Pin,
  Ticket,
  User,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Ticket as TicketInterface } from "@/types/ticket";
import { QRTicket } from "./QRTicket";

const badgeStatus = (status: string) => {
  switch (status) {
    case "mendatang":
      return (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-md py-1 px-2">
          <span
            className="w-2 h-2 rounded-full bg-green-500 animate-pulse
"
          ></span>{" "}
          Akan Datang
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300 rounded-md py-1 px-2">
          <Check /> Selesai
        </Badge>
      );
  }
};

const iconData = ({
  Icon,
  title,
  data,
  status,
}: {
  Icon: any;
  title: string;
  data: string | number;
  status: string;
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={`w-10 h-10 rounded-full  flex items-center justify-center ${
          status == "selesai"
            ? "text-primary-600 bg-gray-300"
            : "text-blue-600 bg-blue-50"
        } shrink-0`}
      >
        <Icon />
      </div>
      <div className="flex flex-col">
        <p className="uppercase font-grotesk tracking-wider">{title}</p>
        <h4 className="capitalize font-semibold">{data}</h4>
      </div>
    </div>
  );
};

export const MyTicketCard = ({
  id,
  status_event,
  ticket_code,
  quantity,
  ticket_date,
  ticket_category,
  event_title,
  event_location,
}: TicketInterface) => {
  return (
    <article
      className={`flex flex-col md:flex-row gap-5 font-jakarta border-2 -translate-y-0.75 hover:translate-1 hover:shadow-none shadow-[5px_5px_0px_0px_#323232] cursor-pointer transition-all ease-in-out ${
        status_event == "selesai" && "bg-muted opacity-60 hover:opacity-70"
      }`}
    >
      <div className="flex flex-col gap-4 w-full p-4 md:p-6">
        <div className="flex justify-between font-semibold">
          {badgeStatus(status_event ?? "")}
          <p className="text-gray-600">Order ID: #INV/ETZ/{id}</p>
        </div>
        <h3 className="text-xl font-bold">{event_title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {iconData({
            Icon: CalendarDays,
            title: "tanggal",
            data: ticket_date ?? "1",
            status: status_event ?? "",
          })}
          {iconData({
            Icon: Pin,
            title: "lokasi",
            data: event_location ?? "",
            status: status_event ?? "",
          })}
          {iconData({
            Icon: Ticket,
            title: "jenis tiket",
            data: ticket_category ?? "",
            status: status_event ?? "",
          })}
          {iconData({
            Icon: User,
            title: "kuantitas",
            data: quantity ?? 1,
            status: status_event ?? "",
          })}
        </div>
      </div>
      <div
        className={`flex flex-col w-full md:w-1/4 justify-center text-center gap-3 p-4 border-t-2 md:border-t-0 md:border-l-2 border-dashed ${
          status_event == "selesai" ? "bg-gray-300" : "bg-gray-50"
        }`}
      >
        {status_event == "selesai" ? (
          <>
            <div className="w-17 h-17 rounded-full bg-gray-400/70 text-gray-600 flex items-center justify-center text-primary-600 shrink-0 mx-auto">
              <CheckCheck size={50} className="mx-auto" />
            </div>
            <p className="text-sm">Acara telah berakhir</p>
          </>
        ) : (
          <>
            <div className="self-center rounded-lg shadow-sm border border-gray-100 ">
              <QRTicket ticket_code={ticket_code ?? ""} />
            </div>
            <p className="text-sm">Tunjukkan QR Code ini saat di pintu masuk</p>
          </>
        )}
      </div>
    </article>
  );
};
