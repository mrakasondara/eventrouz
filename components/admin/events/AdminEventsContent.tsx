"use client";
import { CalendarDays } from "lucide-react";
import { TableEvents } from "./table/TableEvents";
import { getSingleDate } from "@/lib/date";
import { AddEventDialog } from "./add-dialog/AddEventDialog";

export const AdminEventsContent = ({ events }: { events: any }) => {
  const latestUpdate = events?.data[0].updated_at;

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20">
      <section className="flex flex-col md:flex-row gap-5 font-grotesk md:items-center">
        <p className="p-3 border-2 bg-blue shadow-[3px_3px_0px_0px_#323232] self-start">
          <CalendarDays size={30} color="white" />
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Daftar Event</h2>
          <p className="text-sm text-muted-foreground">
            Terakhir diperbarui{" "}
            {latestUpdate !== ""
              ? getSingleDate({ date: latestUpdate ?? "", type: "full" })
              : "-"}
          </p>
        </div>

        <AddEventDialog />
      </section>

      <TableEvents events={events?.data} />
    </div>
  );
};
