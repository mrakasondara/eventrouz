"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { TableActions } from "./TableActions";
import { Spinner } from "@/components/ui/spinner";
import { Loading } from "@/components/layout/Loading";

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

export const TableEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await EventsAPI.getEvents({});
      if (response.success) {
        setEvents(response.data);
      } else {
        toast.error("Silahkan login ulang", { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
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
            {events.map((event: Event) => {
              return (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.id}</TableCell>
                  <TableCell>
                    <Link href={`/events/${event.id}`} className="underline">
                      {event.title}
                    </Link>
                  </TableCell>
                  <TableCell>{event.start_at}</TableCell>
                  <TableCell>{event.end_at}</TableCell>
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
                    <TableActions id={event?.id} />
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
