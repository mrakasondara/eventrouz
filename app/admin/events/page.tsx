import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { AdminEventsContent } from "@/components/admin/events/AdminEventsContent";
import { EventsAPI } from "@/lib/services/api/events-api";
import { Suspense } from "react";
import { Loading } from "@/components/layout/Loading";

export const metadata = { title: "Halaman Event" };

export default async function AdminEvents() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const events = await EventsAPI.getEvents({});

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <Suspense fallback={<Loading />}>
        <AdminEventsContent events={events} />
      </Suspense>
    </div>
  );
}
