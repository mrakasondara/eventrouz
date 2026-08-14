import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { AdminTicketsContent } from "@/components/admin/tickets/AdminTicketsContent";
import { Suspense } from "react";
import { Loading } from "@/components/layout/Loading";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";

export const metadata = { title: "Halaman Daftar Tiket" };

export default async function AdminTickets() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const token = await getAccessToken();
  const tickets = await EventsAPI.getTickets({ token: token ?? "" });

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <Suspense fallback={<Loading />}>
        <AdminTicketsContent tickets={tickets} />
      </Suspense>
    </div>
  );
}
