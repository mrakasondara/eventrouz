"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTicketForm } from "./AddTicketForm";

export const AddTicketDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="brutalism"
            size="sm"
            className="bg-blue capitalize ml-auto w-full md:w-auto md:self-start"
          />
        }
      >
        + tambah tiket baru
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl shadow-[8px_8px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader>
          <DialogTitle>Tambah Tiket Baru</DialogTitle>
          <AddTicketForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
