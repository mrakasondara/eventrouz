"use client";

import { toast } from "sonner";
import { startTransition, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { Textarea } from "@/components/ui/textarea";
import { Loading } from "@/components/layout/Loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateAndTimeInput } from "../DateAndTimeInput";
import { format } from "date-fns";
import { ActionResponse, updateEventState } from "@/app/actions/actions";
import { Spinner } from "@/components/ui/spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const EditEventForm = ({
  id,
  setOpen,
}: {
  id: number | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    status: "",
    startAt: "",
    endAt: "",
  });
  const [selectedFile, setSelectedFile] = useState<any>("");

  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>("");

  const handleChangeValue = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const getEventData = async () => {
    try {
      setLoading(true);
      const response = await EventsAPI.getEventDetail(id);
      if (response.success) {
        const data = response.data;

        const formattedStatus = data.status
          ? data.status.charAt(0).toUpperCase() + data.status.slice(1)
          : "";

        setFormData((prevData) => ({
          ...prevData,
          title: data.title ?? "",
          location: data.location ?? "",
          description: data.description ?? "",
          status: formattedStatus,
        }));

        if (data.start_at) {
          const [sDate, sTime] = data.start_at.split(" ");
          setStartDate(sDate ? new Date(sDate) : undefined);
          setStartTime(sTime ?? "");
        }

        if (data.end_at) {
          const [eDate, eTime] = data.end_at.split(" ");
          setEndDate(eDate ? new Date(eDate) : undefined);
          setEndTime(eTime ?? "");
        }
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const getStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    const getEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

    const startAt = `${getStartDate} ${startTime}`.trim();
    const endAt = `${getEndDate} ${endTime}`.trim();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("location", formData.location);
    payload.append("description", formData.description);
    payload.append("status", formData.status.toLowerCase());
    payload.append("start_at", startAt);
    payload.append("end_at", endAt);
    payload.append("_method", "PUT");

    if (selectedFile) {
      payload.append("image_thumb", selectedFile);
    }

    startTransition(async () => {
      const response = await updateEventState(initialState, payload, id);
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    });
  };

  const startDateInput = {
    isOpen: openStartDate,
    setIsOpen: setOpenStartDate,
    date: startDate,
    setDate: setStartDate,
    time: startTime,
    setTime: setStartTime,
  };

  const endDateInput = {
    isOpen: openEndDate,
    setIsOpen: setOpenEndDate,
    date: endDate,
    setDate: setEndDate,
    time: endTime,
    setTime: setEndTime,
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <form className="flex flex-col gap-3 mt-3" onSubmit={onSubmitForm}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Nama Event</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location">Lokasi Event</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Deskripsi Event</label>
            <Textarea
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Waktu Mulai</label>
            <DateAndTimeInput {...startDateInput} />
          </div>
          <div className="flex flex-col gap-2">
            <label>Waktu Selesai</label>
            <DateAndTimeInput {...endDateInput} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status">Status Event</label>
            <Select
              id="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value ?? "" }))
              }
            >
              <SelectTrigger className="w-full px-3">
                <SelectValue placeholder="Status event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="py-2">
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Launch">Launch</SelectItem>
                  <SelectItem value="End">End</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image_thumb">Thumbnail</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black px-2 bg-white shadow-[3px_3px_0px_0px_#323232]"
              id="image_thumb"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className="text-yellow-600 text-xs">
              Silahkan masukkan file jika ingin merubah thumbnail
            </span>
          </div>
          <Button
            type="submit"
            variant="brutalism"
            size="sm"
            className="bg-blue mt-3"
          >
            {isPending && <Spinner />} Ubah Event
          </Button>
        </>
      )}
    </form>
  );
};
