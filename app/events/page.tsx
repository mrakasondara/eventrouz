import { EventsContent } from "@/components/events/EventsContent";

export const metadata = { title: "Cari & Beli Tiket Event" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function Events({ searchParams }: PageProps) {
  const { search, status } = await searchParams;

  return (
    <div className="flex flex-col gap-3 px-5 py-12">
      <EventsContent search={search} status={status} />
    </div>
  );
}
