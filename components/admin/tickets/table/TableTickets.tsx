"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export const TableTickets = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <section className="flex flex-col gap-2 mt-5">
      {!tickets.length && (
        <TableCaption>Daftar event tidak tersedia.</TableCaption>
      )}
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
          {tickets.length &&
            tickets.map((ticket: Ticket) => {
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
    </section>
  );
};
