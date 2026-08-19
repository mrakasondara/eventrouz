import { EventDetailContent } from "@/components/events/event-detail/EventDetailContent";
import { EventsAPI } from "@/lib/services/api/events-api";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id?: number;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const response = await EventsAPI.getEventDetail(id);
  if (response.success) {
    const title = response.data?.title;
    return { title };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await EventsAPI.getEventDetail(id);

  if (!response.success) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12">
      <EventDetailContent data={response.data} />
    </div>
  );
}
