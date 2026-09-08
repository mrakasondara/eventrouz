"use client";
import { useEffect, useState } from "react";
import { DynamicDateItem } from "@/lib/date";
import { PackageTicketOptionProps } from "./AddTicketForm";
import { Calendar } from "lucide-react";

export const PackageTicketOption = ({
  isPackage,
  setIsPackage,
  isMultipleDay,
  setIsMultipleDay,
  datesOptions,
  setDate,
}: PackageTicketOptionProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const toggleDate = (date: string) => {
    if (!date) return;

    setSelectedDates((prev) => {
      const newDates = selectedDates.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date];

      return newDates;
    });
  };

  useEffect(() => {
    setDate(selectedDates);
  }, [selectedDates, setDate]);

  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex gap-2">
        <label>Tiket merupakan package ticket?</label>
        <input
          type="checkbox"
          checked={isPackage}
          onChange={(e) => setIsPackage(e.target.checked)}
        />
      </div>
      {isPackage && (
        <div className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col gap-4">
          <label
            htmlFor="package_type"
            className="text-xs font-bold uppercase tracking-wider text-black/60 block mb-2"
          >
            Tipe Package Ticket
          </label>
          <div className="flex gap-3 ml-2">
            <label
              htmlFor="full_day"
              className="flex items-center gap-2 cursor-pointer text-sm font-bold"
            >
              Full Day
              <input
                type="radio"
                name="package_type"
                value="full_day"
                checked={!isMultipleDay}
                onChange={(e) => setIsMultipleDay(false)}
              />
            </label>
            <label
              htmlFor="custom"
              className="flex items-center gap-2 cursor-pointer text-sm font-bold"
            >
              Custom Multiple Day
              <input
                type="radio"
                name="package_type"
                checked={isMultipleDay}
                value="custom"
                onChange={(e) => setIsMultipleDay(true)}
              />
            </label>
          </div>
          {isMultipleDay && (
            <div className="flex flex-col gap-2 pt-2 border-t-2 border-black/10">
              <label
                htmlFor="date"
                className="text-xs font-bold uppercase tracking-wider text-black/70 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Pilih hari untuk paket ini
              </label>

              <div className="grid grid-cols-2 gap-2 mt-1">
                {datesOptions?.map((date: DynamicDateItem) => {
                  const isChecked = Boolean(
                    date?.dateString && selectedDates?.includes(date.dateString)
                  );
                  return (
                    <label
                      key={date.id}
                      className={`flex items-center justify-between p-2.5 border-2 border-black cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#4300ff] text-white shadow-[2px_2px_0px_0px_#000]"
                          : "bg-white text-black hover:bg-black/5"
                      }`}
                    >
                      {date.dateString}
                      <input
                        type="checkbox"
                        name={date.id}
                        value={date.dateString}
                        onChange={() => toggleDate(date.dateString ?? "")}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
