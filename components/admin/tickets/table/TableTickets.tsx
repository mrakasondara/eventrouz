"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle } from "@/lib/toaster-styles";
import { Loading } from "@/components/layout/Loading";
import { getAccessToken } from "@/app/actions/auth";
import { TableTicketsActions } from "./TableTicketsActions";

interface Event {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  image_thumb?: string;
  start_at?: string;
  end_at?: string;
  location?: string;
}

interface Ticket {
  id?: number;
  event?: Event;
  name?: number;
  price?: number;
  quota?: number;
  reserved?: number;
  updated_at?: string | undefined;
}

export const TableTickets = ({
  setUpdate,
}: {
  setUpdate: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getTickets = async () => {
    const token = await getAccessToken();

    if (!token) {
      toast.error("Sesi kedaluarsa, silahkan logout dan lakukan login ulang", {
        style: errorStyle,
      });
    }

    try {
      setLoading(true);
      const response = await EventsAPI.getTickets({
        search: "",
        token: token ?? "",
      });
      if (response.success) {
        setTickets(response.data);
        setUpdate(response.data[0]?.updated_at);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <section className="flex flex-col gap-2 mt-5">
      {loading ? (
        <div className="flex flex-col gap-2 mt-20">
          <Loading />
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-gray font-sans font-semibold">
            <TableRow>
              <TableHead className="w-[40px]">ID</TableHead>
              <TableHead>Nama Tiket</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Kuota</TableHead>
              <TableHead>Terpesan</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket: Ticket) => {
              return (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.name}</TableCell>
                  <TableCell>
                    <Link
                      href={`/events/${ticket.event?.id}`}
                      className="underline"
                    >
                      {ticket.event?.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    Rp. {ticket?.price?.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{ticket.quota}</TableCell>
                  <TableCell>{ticket.reserved}</TableCell>

                  <TableCell className="text-right">
                    <TableTicketsActions id={ticket.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
