import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { AdminEventsContent } from "@/components/admin/events/AdminEventsContent";

export const metadata = { title: "Halaman Event" };

export default async function AdminEvents() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <AdminEventsContent />
    </div>
  );
}
