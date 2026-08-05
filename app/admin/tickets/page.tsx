import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { AdminTicketsContent } from "@/components/admin/tickets/AdminTicketsContent";

export const metadata = { title: "Halaman Daftar Tiket" };

export default async function AdminTickets() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <AdminTicketsContent />
    </div>
  );
}
