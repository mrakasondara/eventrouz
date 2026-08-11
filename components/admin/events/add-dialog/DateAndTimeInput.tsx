"use client";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  time: string | undefined;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DateAndTimeInput = ({
  isOpen,
  setIsOpen,
  date,
  setDate,
  time,
  setTime,
}: ComponentProps) => {
  return (
    <FieldGroup className="w-full flex-row font-grotesk">
      <Field>
        <FieldLabel htmlFor="date-picker-optional" hidden>
          Date
        </FieldLabel>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-optional"
                className="w-32 justify-between font-normal"
              />
            }
          >
            {date ? format(date, "PPP") : "Pilih tanggal"}
            <ChevronDownIcon />
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date);
                setIsOpen(false);
              }}
              required
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional" hidden>
          Time
        </FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={time}
          onChange={(e: any) => setTime(e.target.value)}
          defaultValue="10:30:00"
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none border-2 border-black pl-3"
          required
        />
      </Field>
    </FieldGroup>
  );
};
