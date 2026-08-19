"use client";

import { getEventDate } from "@/lib/date";
import { EventDetail } from "@/types/event";
import { SelectTicketForm } from "./SelectTicketForm";

export const EventDetailContent = ({ data }: { data: EventDetail }) => {
  const startAt = data?.start_at ?? "";
  const endAt = data?.end_at ?? "";
  const date = getEventDate({
    start_at: startAt,
    end_at: endAt,
    type: "short",
  });

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto mt-30 font-grotesk border-2 shadow-[4px_4px_0px_0px_#091413] ">
      <section
        className={`w-full h-[20rem] md:h-[30rem] lg:h-[35rem] flex items-center md:items-end md:pb-12 px-5 bg-cover bg-center`}
        style={{
          backgroundImage: data?.image_thumb_url
            ? `url('${data.image_thumb_url}')`
            : "none",
        }}
      >
        <div className="flex flex-col w-full text-center gap-3 md:text-start md:w-1/2">
          <h1 className="text-4xl md:text-5xl text-white font-semibold font-lilita text-shadow-lg">
            {data?.title}
          </h1>
          <p className="md:text-lg font-semibold text-white">
            {data?.location} | {date}
          </p>
        </div>
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-5">
        <div className="flex flex-col gap-3">
          <h4 className="font-lilita text-lg">Deskripsi Event</h4>
          <p>{data?.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-lilita text-lg">Pilih Tiket</h4>
          <SelectTicketForm data={data} />
        </div>
      </section>
    </div>
  );
};
