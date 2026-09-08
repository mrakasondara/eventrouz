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
import React, { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { PackageTicketOption } from "./PackageTicketOption";
import { DynamicDateItem, getEventDate, getParsedDate } from "@/lib/date";

interface EventOption {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
}

export interface PackageTicketOptionProps {
  isPackage: boolean;
  setIsPackage: React.Dispatch<React.SetStateAction<boolean>>;
  isMultipleDay: boolean;
  setIsMultipleDay: React.Dispatch<React.SetStateAction<boolean>>;
  datesOptions: DynamicDateItem[] | undefined;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [datesOptions, setDatesOptions] = useState<
    DynamicDateItem[] | undefined
  >();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string | undefined>("");
  const [date, setDate] = useState<string[]>([]);
  const [price, setPrice] = useState<number | string | undefined>("");
  const [quota, setQuota] = useState<number | string | undefined>("");
  const [reserved, setReserved] = useState<number | string | undefined>("");

  const [event, setEvent] = useState<string | undefined>("");
  const [eventId, setEventId] = useState<string | undefined>("");

  const [isPackage, setIsPackage] = useState<boolean>(false);
  const [isMultipleDay, setIsMultipleDay] = useState<boolean>(false);
  const [allDay, setAllDay] = useState<DynamicDateItem[]>();

  const packageTicketOptionProps: PackageTicketOptionProps = {
    isPackage,
    setIsPackage,
    isMultipleDay,
    setIsMultipleDay,
    datesOptions,
    setDate,
  };

  const handleEventChange = (value: string | null) => {
    setEvent(value ?? "");
    if (value) {
      const targetedEvent = eventsOptions?.filter(
        (event) => event.title === value
      )[0];

      const date = getEventDate({
        start_at: targetedEvent?.start_at ?? "",
        end_at: targetedEvent?.end_at ?? "",
        type: "short",
      });

      const parsedDate = getParsedDate(date, false);
      const allDay = getParsedDate(date, true);

      setDatesOptions(parsedDate);
      setAllDay(allDay);
    }
  };

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
    setEventId(eventId);

    const formData = new FormData();
    formData.append("name", name ?? "");
    formData.append("price", price?.toString() ?? "0");
    formData.append("quota", quota?.toString() ?? "0");
    formData.append("is_package", String(isPackage));

    if (isMultipleDay) {
      date?.forEach((d) => {
        formData.append("event_ticket_date[]", d);
      });
    } else {
      const originalDate = allDay?.[0]?.dateString ?? "";
      formData.append("event_ticket_date[]", originalDate);
    }

    startTransition(async () => {
      const response = await addTicketState(initialState, eventId, formData);
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
            <Select id="event" value={event} onValueChange={handleEventChange}>
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

          <PackageTicketOption {...packageTicketOptionProps} />

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
