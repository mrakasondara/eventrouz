import { getAccessToken } from "@/app/actions/auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Loading } from "@/components/layout/Loading";
import { OrderDetailContent } from "@/components/order/order-detail/OrderDetailContent";
import { EventsAPI } from "@/lib/services/api/events-api";
import { getServerSession } from "next-auth";
import { RedirectType, notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id?: number;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const title = `Transaksi ${id?.toString().toUpperCase()}`;
  return { title };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const { id } = await params;
  const split = String(id).split("-");
  const transactionId = split[2];

  const token = await getAccessToken();

  const response = await EventsAPI.getOrderDetail({
    token: token ?? "",
    id: Number(transactionId),
  });

  if (!response.success) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12">
      <Suspense fallback={<Loading />}>
        <OrderDetailContent formatId={id ?? 0} data={response.data} />
      </Suspense>
    </div>
  );
}
