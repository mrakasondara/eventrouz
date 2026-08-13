"use client";

import React, { useRef, useState, useTransition } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateAndTimeInput } from "../DateAndTimeInput";
import { Button } from "@/components/ui/button";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { Spinner } from "@/components/ui/spinner";
import { ActionResponse, addEventState } from "@/app/actions/actions";

const intialState: ActionResponse = {
  success: false,
  message: "",
};

export const AddEventForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    status: "Draft",
  });

  const [selectedFile, setSelectedFile] = useState<any>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

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

  const onSubmitForm = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const getStartDate = format(startDate ?? 0, "yyyy-MM-dd");
    const getEndDate = format(endDate ?? 0, "yyyy-MM-dd");

    const startAt = `${getStartDate} ${startTime}`;
    const endAt = `${getEndDate} ${endTime}`;

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("location", formData.location);
    payload.append("description", formData.description);
    payload.append("status", formData.status.toLowerCase());
    payload.append("start_at", startAt);
    payload.append("end_at", endAt);
    payload.append("image_thumb", selectedFile);

    startTransition(async () => {
      const response = await addEventState(intialState, payload);
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
        formRef.current?.reset();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    });
  };

  return (
    <form className="flex flex-col gap-3 mt-3" onSubmit={onSubmitForm}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Nama Event</label>
        <Input
          className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
          id="title"
          name="title"
          placeholder="Kreatif Event"
          type="text"
          value={formData.title}
          onChange={handleChangeValue}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location">Lokasi Event</label>
        <Input
          className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
          id="location"
          name="location"
          placeholder="Jakarta"
          type="text"
          value={formData.location}
          onChange={handleChangeValue}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Deskripsi Event</label>
        <Textarea
          className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
          id="description"
          name="description"
          placeholder="Deskripsi Event"
          value={formData.description}
          onChange={handleChangeValue}
          required
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
          required
        />
      </div>
      <Button
        type="submit"
        variant="brutalism"
        size="sm"
        className="bg-blue mt-3"
      >
        {isPending && <Spinner />} Tambah Event
      </Button>
    </form>
  );
};
