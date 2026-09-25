import { getEventDate, getParsedDate } from "@/lib/date";
import React from "react";

export const DayOptionCard = ({
  startAt,
  endAt,
  isPackage,
  eventTicketDate,
  setTicketDay,
}: {
  startAt?: string;
  endAt?: string;
  isPackage: boolean | number;
  eventTicketDate?: string | string[] | null;
  setTicketDay: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const date = getEventDate({
    start_at: startAt ?? "",
    end_at: endAt ?? "",
    type: "short",
  });
  const parsedDate = getParsedDate(date, Boolean(isPackage));

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="grid grid-cols-2">
        {Boolean(isPackage) && (
          <div className="mt-2">
            <h4 className="font-lilita text-lg">Detail Hari</h4>
            <p className="my-2">
              <label
                htmlFor="package"
                className="flex items-center p-2.5 border-2 border-black cursor-pointer transition-all bg-white text-black hover:bg-black/5 has-checked:bg-[#4300ff] has-checked:text-white has-checked:shadow-[2px_2px_0px_0px_#000]"
              >
                {Array.isArray(eventTicketDate)
                  ? eventTicketDate.map((date, index) => {
                      return (
                        <span key={index} className="text-sm mr-3">
                          {date}{" "}
                          {index == eventTicketDate.length - 1 ? "" : ","}
                        </span>
                      );
                    })
                  : ""}
                <input
                  className="ml-auto"
                  type="radio"
                  id="package"
                  name="event_ticket_date"
                  value={eventTicketDate ?? []}
                  defaultChecked
                />
              </label>
            </p>
          </div>
        )}
      </div>
      {!Boolean(isPackage) && (
        <>
          <h4 className="font-lilita text-lg">Pilih Hari</h4>
          <div className="grid grid-cols-2 gap-2 w-full">
            {parsedDate.map((item) => (
              <label
                key={item.id}
                htmlFor={`event_ticket_date_${item.id}`}
                className="flex items-center justify-between p-2.5 border-2 border-black cursor-pointer transition-all bg-white text-black hover:bg-black/5 has-checked:bg-[#4300ff] has-checked:text-white has-checked:shadow-[2px_2px_0px_0px_#000]"
              >
                {item.label} - {item.dateString}
                <input
                  type="radio"
                  id={`event_ticket_date_${item.id}`}
                  name="event_ticket_date"
                  value={item.dateString}
                  onChange={(e) => setTicketDay(e.target.value)}
                />
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
