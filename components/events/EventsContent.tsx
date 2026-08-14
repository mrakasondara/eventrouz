"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toaster-styles";
import { EventsAPI } from "@/lib/services/api/events-api";
import { SkeletonEvents } from "../skeleton/SkeletonEvents";
import { EventItem } from "./EventItem";
import { EventCard } from "@/types/event";
import { EventFilterSection } from "./EventFilterSection";

interface EventsContent {
  search?: string;
  status?: string;
}

export const EventsContent = ({ search, status }: EventsContent) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const limit = 0;
      const response = await EventsAPI.getEvents({ limit, search, status });
      if (response.success) {
        setEvents(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, status]);
  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto py-30 font-grotesk">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">
          Temukan Event Seru di Sekitarmu
        </h1>
        <p className="text-lg">
          Jelajahi konser, seminar, dan festival pilihan. Amankan tiketmu
          sebelum kehabisan.
        </p>
      </div>

      {!loading && <EventFilterSection resultLength={events.length} />}

      <section
        className={`grid grid-cols-2 md:grid-cols-3 gap-8 mt-10 ${
          loading ? "" : "min-h-screen"
        }`}
      >
        {loading ? (
          <SkeletonEvents />
        ) : (
          events.map((event: EventCard, index) => {
            return <EventItem {...event} key={index} />;
          })
        )}
      </section>
    </div>
  );
};
