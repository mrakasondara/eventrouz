"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketStore } from "@/types/api";

interface Ticket extends ticketStore {
  id?: number;
}

interface PageProps {
  ticket: Ticket;
  selectedTicket: number | null;
  onChange: React.Dispatch<React.SetStateAction<number | null>>;
  setTotalTicket: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TicketOptionCard = ({
  ticket,
  selectedTicket,
  onChange,
  setTotalTicket,
}: PageProps) => {
  const [count, setCount] = useState(0);
  const isSelected = selectedTicket == ticket.id;

  const handleIncrement = () => {
    setCount(count + 1);
    setTotalTicket(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
    setTotalTicket(count - 1);
  };

  return (
    <label htmlFor={`ticket-${ticket?.id}`} className="cursor-pointer">
      <input
        type="radio"
        id={`ticket-${ticket?.id}`}
        className="sr-only"
        value={ticket?.id}
        checked={isSelected}
        onChange={() => onChange(ticket.id ?? null)}
        required
      />
      <div
        className={`flex flex-col gap-2 border-2 ${
          isSelected
            ? "shadow-[4px_4px_0px_0px_#091413]"
            : "bg-gray hover:shadow-[4px_4px_0px_0px_#091413]"
        } p-3 transition-all ease-in-out`}
        key={ticket.id}
      >
        <h6 className="font-semibold">{ticket.name}</h6>
        <div className="flex justify-between">
          <p className="text-md font-lilita">
            Rp. {ticket.price.toLocaleString("id-ID")}
          </p>
          {isSelected && (
            <div className="flex justify-end gap-2 items-center">
              <Button
                variant="brutalism"
                size="icon-xs"
                onClick={handleDecrement}
              >
                <Minus />
              </Button>
              <span>{count}</span>
              <Button
                variant="brutalism"
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
  );
};
