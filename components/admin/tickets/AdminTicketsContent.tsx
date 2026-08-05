"use client";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { TableTickets } from "./table/TableTickets";
import { useState } from "react";
import { getSingleDate } from "@/lib/date";

export const AdminTicketsContent = () => {
  const [latestUpdate, setLatestUpdate] = useState<string | undefined>("");

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20">
      <section className="flex gap-5 font-grotesk items-center">
        <p className="p-3 border-2 bg-blue shadow-[3px_3px_0px_0px_#323232]">
          <Ticket size={30} color="white" />
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Daftar Tiket</h2>
          <p className="text-sm text-muted-foreground">
            Terakhir diperbarui{" "}
            {latestUpdate !== ""
              ? getSingleDate({ date: latestUpdate ?? "", type: "full" })
              : "-"}
          </p>
        </div>
        <Button
          variant="brutalism"
          size="sm"
          className="bg-blue capitalize ml-auto self-start"
        >
          + tambah tiket baru
        </Button>
      </section>

      <TableTickets setUpdate={setLatestUpdate} />
    </div>
  );
};
