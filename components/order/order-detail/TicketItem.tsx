import { rupiahFormatter } from "@/lib/formatter";
import { TicketInOrder } from "@/types/order";
import { QRDialog } from "./QRDialog";

export const TicketItem = ({
  status,
  data,
}: {
  status: string;
  data: TicketInOrder;
}) => {
  const {
    event_ticket_date,
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
        {status === "paid" && <QRDialog ticket_code={ticket_code} />}
      </div>
      <div className="flex items-center">
        <p className="text-sm font-semibold">
          {quantity} x {rupiahFormatter.format(price)}
        </p>
      </div>
    </div>
  );
};
