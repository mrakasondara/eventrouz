"use client";

import { ActionResponse, addTicketState } from "@/app/actions/actions";
import { getAccessToken } from "@/app/actions/auth";
import { Loading } from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface EventOption {
  id: string;
  title: string;
}

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const AddTicketForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const [eventsOptions, setEventsOptions] = useState<EventOption[]>();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quota, setQuota] = useState("");
  const [reserved, setReserved] = useState("");
  const [event, setEvent] = useState("");
  const [eventId, setEventId] = useState("");

  const getEventsOptions = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const response = await EventsAPI.getEventsOptions(token ?? "");
      if (response.success) {
        setEventsOptions(response.data);
      } else {
        if (response.message == "Unauthenticated.") {
          toast.error("Sesi kedaluarsa, silahkan login ulang", {
            style: errorStyle,
          });
        } else {
          toast.error(response.message, { style: errorStyle });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const selectedEvent = eventsOptions?.find(
      (option) => option.title == event
    );
    const eventId = selectedEvent?.id;
    setEventId(eventId ?? "");

    const data = {
      name,
      price: Number(price),
      quota: Number(quota),
      reserved: Number(reserved),
    };

    startTransition(async () => {
      const response = await addTicketState(initialState, eventId, data);
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
        formRef.current?.reset();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    });
  };

  useEffect(() => {
    getEventsOptions();
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
            <Select
              id="event"
              value={event}
              onValueChange={(value) => setEvent(value ?? "")}
            >
              <SelectTrigger className="w-full px-3">
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="py-2">
                  {eventsOptions?.map((option: EventOption) => {
                    return (
                      <SelectItem value={option.title} key={option.id}>
                        {option.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
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
            {isPending && <Spinner />} Tambah Tiket
          </Button>
        </>
      )}
    </form>
  );
};
