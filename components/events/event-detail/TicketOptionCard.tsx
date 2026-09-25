"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketStore } from "@/types/api";
import { TicketData } from "./SelectTicketForm";

interface Ticket extends ticketStore {
  id?: number;
}

interface ComponentProps {
  ticket: Ticket;
  selectedTicket: number | null;
  setSelectedTicket: React.Dispatch<React.SetStateAction<number | null>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setIsPackage: React.Dispatch<React.SetStateAction<boolean | number>>;
  setTicketData: React.Dispatch<React.SetStateAction<TicketData | null>>;
}

export const TicketOptionCard = ({
  ticket,
  selectedTicket,
  setSelectedTicket,
  setQuantity,
  setIsPackage,
  setTicketData,
}: ComponentProps) => {
  const [count, setCount] = useState(0);
  const isSelected = selectedTicket == ticket.id;

  const handleIncrement = (e: React.MouseEvent) => {
    let newCount = count + 1;
    setCount(newCount);

    setQuantity(newCount);
  };
  const handleDecrement = (e: React.MouseEvent) => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      setQuantity(newCount);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`ticket-${ticket?.id}`}
        className="cursor-pointer transition"
      >
        <input
          type="radio"
          id={`ticket-${ticket?.id}`}
          name="ticket_selection"
          className="sr-only"
          value={ticket?.id}
          checked={isSelected}
          onChange={() => {
            setSelectedTicket(ticket.id ?? null);
            setTicketData({
              ticket_category_name: ticket.name,
              event_ticket_date: ticket.event_ticket_date,
              ticket_category_id: ticket.id,
              price: ticket.price,
              quota: ticket.quota,
              is_package: ticket.is_package,
            });
            setIsPackage(ticket.is_package ?? 0);
          }}
          required
        />
        <div
          className={`flex flex-col gap-2 border-2 ${
            isSelected
              ? "bg-[#4300ff] text-white border-black shadow-[4px_4px_0px_0px_#091413]"
              : "bg-gray hover:shadow-[4px_4px_0px_0px_#091413]"
          } p-3 transition-all ease-in-out`}
          key={ticket.id}
        >
          <h6 className="font-semibold">{ticket.name}</h6>
          <div className="flex justify-between flex-wrap gap-2">
            <p className="text-md font-lilita">
              {ticket.price
                ? `Rp. ${ticket.price.toLocaleString("id-ID")} `
                : "Rp. 0"}
            </p>
            {isSelected && (
              <div className="flex justify-end gap-2 items-center ml-auto text-black">
                <Button
                  variant="brutalism"
                  className="border"
                  size="icon-xs"
                  onClick={handleDecrement}
                >
                  <Minus />
                </Button>
                <span className="text-white">{count}</span>
                <Button
                  variant="brutalism"
                  className="border"
                  size="icon-xs"
                  onClick={handleIncrement}
                >
                  <Plus />
                </Button>
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};
