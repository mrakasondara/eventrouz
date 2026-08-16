"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ActionResponse, updateTicketState } from "@/app/actions/actions";
import { Loading } from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { getAccessToken } from "@/app/actions/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const EditTicketForm = ({
  eventId,
  ticketId,
  setOpen,
}: {
  eventId: number | undefined;
  ticketId: number | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState<string | undefined>("");
  const [eventName, setEventName] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>("");
  const [quota, setQuota] = useState<string | undefined>("");
  const [reserved, setReserved] = useState<string | undefined>("");

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const body = {
      name: name ?? "",
      price: Number(price),
      quota: Number(quota),
      reserved: Number(reserved),
    };

    const stringTicketId = ticketId?.toString();
    const stringEventId = eventId?.toString();

    startTransition(async () => {
      const response = await updateTicketState(
        initialState,
        stringEventId,
        stringTicketId,
        body
      );
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    });
  };

  const getTicketData = async () => {
    const token = await getAccessToken();
    try {
      setLoading(true);
      const response = await EventsAPI.getTicketDetail({
        token: token ?? "",
        eventId: eventId?.toString() ?? "",
        ticketId: ticketId?.toString() ?? "",
      });
      if (response.success) {
        const data = response.data;
        setName(data.name);
        setEventName(data.event?.title);
        setPrice(data?.price?.toString());
        setQuota(data?.quota?.toString());
        setReserved(data?.reserved?.toString());
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicketData();
  }, []);

  return (
    <form className="flex flex-col gap-3 mt-3" onSubmit={onSubmitForm}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nama Tiket</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="name"
              name="name"
              placeholder="Kategori A"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="event">Event</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              value={eventName}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Harga Tiket</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="price"
              name="price"
              placeholder="50000"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quota">Kuota Tiket</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="quota"
              name="quota"
              placeholder="500"
              type="number"
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reserved">Tiket Terpesan</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="reserved"
              name="reserved"
              placeholder="0"
              type="number"
              value={reserved}
              onChange={(e) => setReserved(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="brutalism"
            size="sm"
            className="bg-blue mt-3"
          >
            {isPending && <Spinner />} Ubah Tiket
          </Button>
        </>
      )}
    </form>
  );
};
