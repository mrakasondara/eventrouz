import { getAccessToken } from "@/app/actions/auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AdminOrdersContent } from "@/components/admin/orders/AdminOrdersContent";
import { Loading } from "@/components/layout/Loading";
import { EventsAPI } from "@/lib/services/api/events-api";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = { title: "Halaman Daftar Transaksi" };

export default async function AdminTransactions() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const token = await getAccessToken();
  const orders = await EventsAPI.getOrders({ token: token ?? "" });

  if (!orders.success) {
    return redirect("/signin?reason=invalid_token", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <Suspense fallback={<Loading />}>
        <AdminOrdersContent orders={orders} />
      </Suspense>
    </div>
  );
}
