"use client";
import React, { useState } from "react";
import { EventDetail } from "@/types/event";
import { TicketOptionCard } from "./TicketOptionCard";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const SelectTicketForm = ({ data }: { data: EventDetail }) => {
  const { data: session } = useSession();

  const [selectedTicket, setSelectedTicket] = useState<number | null>(0);
  const [totalTicket, setTotalTicket] = useState<number | null>(0);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | string | null>("");

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void | number | string> => {
    e.preventDefault();

    if (!selectedTicket || !totalTicket) {
      return toast.warning("Silahkan pilih tiket dan masukkan jumlah tiket");
    }

    const payload = {
      ticketId: selectedTicket,
      totalTicket,
      name: session?.user?.name ?? name,
      email: session?.user?.email ?? "",
      phoneNumber,
    };
    console.log(payload);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmitForm}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
        {data?.ticket_categories &&
          data?.ticket_categories.map((ticket) => (
            <TicketOptionCard
              ticket={ticket}
              selectedTicket={selectedTicket}
              onChange={(id) => setSelectedTicket(id)}
              setTotalTicket={setTotalTicket}
              key={ticket.id}
            />
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nama</label>
        {session?.user?.name ? (
          <p className="px-3 py-2 bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
            {session?.user?.name}
          </p>
        ) : (
          <Input
            className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Isi nama anda"
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <p className="px-3 py-2 bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
          {session?.user?.email}
        </p>
      </div>
      <div className="grid flex-1 gap-1">
        <label htmlFor="phone-number">Nomor Handphone</label>
        <InputGroup>
          <InputGroupInput
            placeholder="8xxxxxx"
            type="number"
            value={phoneNumber ?? 0}
            minLength={9}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <InputGroupAddon>+62</InputGroupAddon>
        </InputGroup>
      </div>
      <Button
        variant="brutalism"
        type="submit"
        size="md"
        className="hover:bg-blue mt-3"
      >
        Pesan Tiket
      </Button>
    </form>
  );
};
