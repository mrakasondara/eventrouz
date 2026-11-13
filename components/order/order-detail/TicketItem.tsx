import { rupiahFormatter } from "@/lib/formatter";
import { QRDialog } from "./QRDialog";
import { QRTicketDialog } from "@/types/ticket";

interface TicketItemInterface extends QRTicketDialog {
  price?: number;
}

export const TicketItem = ({
  status,
  data,
}: {
  status: string;
  data: TicketItemInterface;
}) => {
  const {
    event_ticket_date,
    event_location,
    event_title,
    ticket_category_name,
    ticket_code,
    price,
    quantity,
  } = data;

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-black/80">{event_title}</p>
        <h6 className="text-lg uppercase font-semibold">
          {ticket_category_name}
        </h6>
        <p className="text-sm text-black/80">Tgl Tiket : {event_ticket_date}</p>
        {status === "paid" && <QRDialog {...data} />}
      </div>
      <div className="flex items-center">
        <p className="text-sm font-semibold">
          {quantity} x {rupiahFormatter.format(price ?? 0)}
        </p>
      </div>
    </div>
  );
};
