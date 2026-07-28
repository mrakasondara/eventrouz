import Link from "next/link";
import { getEventDate } from "@/lib/date";
import { FeaturedEvents } from "@/types/event";

export const FeaturedCard = ({
  id,
  title,
  image_thumb,
  start_at,
  end_at,
  location,
}: FeaturedEvents) => {
  const date = getEventDate({ start_at, end_at, type: "short" });

  return (
    <Link href={`/event/${id}`}>
      <article className="flex hover:-translate-[3px] flex-col border-2 shadow-[3px_4px_0px_0px_#091413] hover:shadow-[5px_7px_0px_0px_#091413] relative cursor-pointer">
        <img src={image_thumb} alt="thumb-event" className="h-60 object-fit" />
        <div className="w-full flex top-0 absolute justify-between">
          <span className="text-sm text-white bg-[#091413] p-2 font-semibold border-1 border-white border-t-0 border-l-0 max-w-[150px] truncate text-center">
            📍{location}
          </span>
          <span className="text-sm bg-white p-2 font-semibold border-2 border-t-0 border-r-0">
            {date}
          </span>
        </div>
        <div className="flex justify-between">
          <h4 className="p-3 text-center md:text-start md:text-lg font-bold w-full bg-white">
            {title}
          </h4>
          {/* <p className="bg-[#091413] text-white font-semibold p-3">Rp.15K</p> */}
        </div>
      </article>
    </Link>
  );
};
