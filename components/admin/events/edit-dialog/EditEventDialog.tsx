"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditEventForm } from "./EditEventForm";

export const EditEventDialog = ({ id }: { id: number | undefined }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="group/dropdown-menu-item relative flex items-center gap-2.5 rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase outline-hidden select-none hover:bg-gray w-full cursor-pointer">
        Ubah
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        className="sm:max-w-md md:max-w-xl shadow-[8px_8px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk"
      >
        <DialogHeader>
          <DialogTitle>Ubah Event</DialogTitle>
        </DialogHeader>

        {open && <EditEventForm id={id} setOpen={setOpen} />}
      </DialogContent>
    </Dialog>
  );
};
