import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { OrdersContent } from "@/components/order/OrdersContent";
import { getAccessToken } from "../actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { Suspense } from "react";
import { Loading } from "@/components/layout/Loading";

export const metadata = { title: "Daftar Transaksi" };
export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const token = await getAccessToken();
  const response = await EventsAPI.getOrders({ token: token ?? "" });

  if (!response.success) {
    return redirect("/signin?reason=invalid_token", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 min-h-[50rem]">
      <Suspense fallback={<Loading />}>
        <OrdersContent response={response} />
      </Suspense>
    </div>
  );
}
