"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FeaturedCard } from "./FeaturedCard";
import { EventsAPI } from "@/lib/services/api/events-api";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toaster-styles";
import { FeaturedEvents as FeaturedEventsInterface } from "@/types/event";
import { SkeletonFeaturedEvents } from "@/components/skeleton/SkeletonFeaturedEvents";

export const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      const response = await EventsAPI.getFeaturedEvents(5);
      if (response.success) {
        setEvents(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
        console.log(response);
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchFeaturedEvents();
  }, []);
  return (
    <section className="flex flex-col font-grotesk border-b-2 bg-white">
      <div className="flex bg-[#091413] justify-center px-5 pt-15 pb-30 relative">
        <h2 className="font-grotesk text-5xl text-center uppercase font-bold text-white">
          Beberapa
          <br />{" "}
          <span className="inline-block mt-1 bg-red-600 p-1">
            Event Pilihan
          </span>
        </h2>
      </div>
      <div className="w-full grid grid-cols-2 md:w-3/4 lg:w-1/2 gap-5 -mt-15 pb-30 z-10 mx-auto px-5">
        {loading ? (
          <SkeletonFeaturedEvents />
        ) : (
          events?.map((event: FeaturedEventsInterface, index) => {
            return <FeaturedCard key={index} {...event} />;
          })
        )}
      </div>
      {!loading && (
        <Link
          href="/"
          className="-mt-25 mb-5 px-5 underline md:w-3/4 lg:w-1/2 md:mx-auto cursor-pointer z-10"
        >
          Lihat event lainnya
        </Link>
      )}
    </section>
  );
};
