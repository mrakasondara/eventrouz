"use client";
import { OrderDetail, TicketInOrder } from "@/types/order";
import { TicketItem } from "./TicketItem";
import { PaymentSummary } from "./PaymentSummary";
import { badgeIcon } from "@/components/admin/orders/table/TableOrders";

export const OrderDetailContent = ({
  formatId,
  data,
}: {
  formatId: number;
  data: OrderDetail;
}) => {
  const {
    created_at,
    status,
    total_price,
    snap_token,
    payment,
    details,
    user = null,
  } = data;

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20 font-jakarta">
      <h2 className="text-xl font-semibold font-grotesk">
        ID Transaksi : <span className="uppercase">{formatId}</span>
      </h2>
      <p className="mt-2">
        Detail lengkap transaksi, rincian pembayaran, dan informasi tiket{" "}
        {user ? "user" : "pengguna"}.
      </p>

      <section className="flex flex-col gap-3 mt-20 border p-3 border-black/50">
        <h3 className="text-right text-sm text-black/80 ">
          Tgl Transaksi : {created_at}
        </h3>

        {user && (
          <>
            <h4 className="font-semibold mt-4">Data Pengguna</h4>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex justify-between capitalize">
                <p>Nama Pengguna</p>
                <p>{user?.name}</p>
              </div>
              <div className="flex justify-between">
                <p>Email</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </>
        )}

        <h5 className="font-semibold mt-4">Item Tiket</h5>
        <div className="flex flex-col gap-2 mt-2">
          {details.map((item: TicketInOrder) => {
            return <TicketItem status={status} data={item} key={item.id} />;
          })}
        </div>

        <div className="flex justify-between items-end">
          <h6 className="font-semibold mt-6">Rincian Pembayaran</h6>
          <p>{badgeIcon(status)}</p>
        </div>

        <PaymentSummary
          status={status}
          total_price={total_price}
          data={payment ?? null}
          token={snap_token ?? null}
        />
      </section>
    </div>
  );
};
