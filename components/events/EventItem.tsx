import Link from "next/link";
import { Button } from "../ui/button";
import { EventCard } from "@/types/event";
import { getEventDate } from "@/lib/date";
export const EventItem = ({
  id,
  title,
  image_thumb,
  start_at,
  end_at,
  location,
}: EventCard) => {
  const date = getEventDate({ start_at, end_at, type: "short" });

  return (
    <Link href={`/events/${id}`} className="h-0">
      <article className="flex hover:-translate-y-1 flex-col border-2 shadow-[3px_4px_0px_0px_#091413] hover:shadow-[5px_7px_0px_0px_#091413] p-3 relative">
        <div className="w-full justify-end flex top-0 absolute right-0">
          <span className="text-sm text-white bg-[#091413] p-2 font-semibold border-black border-t-0 border-l-0 max-w-[150px] truncate text-center">
            {date}
          </span>
        </div>

        <img
          src={image_thumb}
          alt="thumb-event"
          className="h-60 object-fit"
          loading="lazy"
        />

        <div className="flex flex-col my-4">
          <h3 className="font-semibold capitalize">{title}</h3>
          <p className="text-sm mt-1 text-black/70">📍 {location}</p>
        </div>

        <Button variant="brutalism" size="sm" className="hover:bg-blue">
          + Keranjang
        </Button>
      </article>
    </Link>
  );
};
