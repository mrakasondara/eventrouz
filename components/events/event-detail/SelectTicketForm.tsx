"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { EventDetail } from "@/types/event";
import { TicketOptionCard } from "./TicketOptionCard";
import { Button } from "@/components/ui/button";
import { UserDataInput } from "./UserDataInput";
import { DayOptionCard } from "./DayOptionCard";
import { CartItem, useCartStore } from "@/lib/store";
import { errorStyle, successStyle, warningStyle } from "@/lib/toaster-styles";
import { getAccessToken } from "@/app/actions/auth";
import { Spinner } from "@/components/ui/spinner";
import { signOut } from "next-auth/react";

export interface TicketData {
  id?: string;
  ticket_category_name?: string;
  price?: number;
  quota?: number;
  is_package?: boolean | number;
  ticket_category_id?: number;
  event_ticket_date?: string | null;
}

export const SelectTicketForm = ({ data }: { data: EventDetail }) => {
  const { addToCart, fetchCart, isLoading } = useCartStore();

  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isPackage, setIsPackage] = useState<boolean | number>(false);
  const [ticketDay, setTicketDay] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  const ticketOptionCardProps = {
    selectedTicket,
    setSelectedTicket,
    setQuantity,
    setIsPackage,
    setTicketData,
  };

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void | number | string> => {
    e.preventDefault();

    if (!selectedTicket || !quantity) {
      return toast.warning("Silahkan pilih tiket dan masukkan jumlah tiket");
    }

    const ticket = {
      ticket_category_id: ticketData?.ticket_category_id ?? 1,
      total_ticket: quantity,
      event_ticket_date: isPackage
        ? Array.isArray(ticketData?.event_ticket_date)
          ? (ticketData.event_ticket_date.filter(Boolean) as string[])
          : typeof ticketData?.event_ticket_date === "string"
          ? [ticketData.event_ticket_date]
          : null
        : ticketDay
        ? [ticketDay]
        : null,
    };

    if (quantity && ticketData?.quota) {
      if (quantity > ticketData?.quota) {
        return toast.warning("Kuota tiket tidak mencukupi", {
          style: warningStyle,
        });
      }
    }

    const token = await getAccessToken();

    const response = await addToCart(token ?? "", ticket);

    if (response.success) {
      fetchCart(token ?? "");
      toast.success(response.message, { style: successStyle });
    } else {
      if (response.message == "Unauthenticated.") {
        toast.error("Sesi kedaluarsa, silahkan login ulang", {
          style: errorStyle,
        });
        setTimeout(() => signOut({ callbackUrl: "/signin" }), 300);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmitForm}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
        {data?.ticket_categories &&
          data?.ticket_categories.map((ticket) => (
            <TicketOptionCard
              key={ticket.id}
              ticket={ticket}
              {...ticketOptionCardProps}
            />
          ))}
      </div>

      {Boolean(selectedTicket) && (
        <DayOptionCard
          startAt={data.start_at}
          endAt={data.end_at}
          isPackage={isPackage}
          eventTicketDate={ticketData?.event_ticket_date}
          setTicketDay={setTicketDay}
        />
      )}

      <Button
        variant="brutalism"
        type="submit"
        size="md"
        className="hover:bg-blue mt-3"
      >
        {isLoading ? <Spinner /> : "+"}
        Tambah ke keranjang
      </Button>
    </form>
  );
};
