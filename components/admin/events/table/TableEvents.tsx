"use client";
import { useState } from "react";
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
import { getEventSingleDateandTime } from "@/lib/date";
import { TableEventsActions } from "./TableEventsActions";
import { Loading } from "@/components/layout/Loading";
import { ListEvent } from "@/types/event";

const badgeClass = (status: string | undefined) => {
  switch (status) {
    case "draft":
      return "bg-yellow-50 text-yellow-700";
    case "launch":
      return "bg-green-50 text-green-700";
    default:
      return "bg-red-50 text-red-700";
  }
};

export const TableEvents = ({ events }: { events: ListEvent[] }) => {
  return (
    <section className="flex flex-col gap-2 mt-5">
      <Table>
        {!events.length && (
          <TableCaption>Daftar event tidak tersedia.</TableCaption>
        )}
        <TableHeader className="bg-gray font-sans font-semibold">
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Waktu Mulai</TableHead>
            <TableHead>Waktu Selesai</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length &&
            events.map((event: ListEvent) => {
              return (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.id}</TableCell>
                  <TableCell>
                    <Link href={`/events/${event.id}`} className="underline">
                      {event.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {getEventSingleDateandTime({
                      date: event.start_at,
                      type: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    {getEventSingleDateandTime({
                      date: event.end_at,
                      type: "short",
                    })}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span
                      className={` ${badgeClass(
                        event.status
                      )} py-1 px-3 capitalize border`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <TableEventsActions id={event?.id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
};
