import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { EventsContent } from "@/components/events/EventsContent";

export const metadata = { title: "Cari & Beli Tiket Event" };
export default async function Events() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12">
      <EventsContent />
    </div>
  );
}
