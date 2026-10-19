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
  const { created_at, status, total_price, payment, details } = data;

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20 font-jakarta">
      <h2 className="text-xl font-semibold font-grotesk">
        ID Transaksi : <span className="uppercase">{formatId}</span>
      </h2>
      <p className="mt-2">
        Detail lengkap transaksi, rincian pembayaran, dan informasi tiket kamu.
      </p>

      <section className="flex flex-col gap-3 mt-20 border p-3 border-black/50">
        <h6 className="text-right text-sm text-black/80 ">
          Tgl Transaksi : {created_at}
        </h6>
        <h5 className="font-semibold mt-4">Item Tiket</h5>
        <div className="flex flex-col gap-2 mt-2">
          {details.map((item: TicketInOrder) => {
            return <TicketItem status={status} data={item} key={item.id} />;
          })}
        </div>

        <div className="flex justify-between items-end">
          <h5 className="font-semibold mt-6">Rincian Pembayaran</h5>
          <p>{badgeIcon(status)}</p>
        </div>

        {payment && (
          <PaymentSummary
            status={status}
            total_price={total_price}
            data={payment}
          />
        )}
      </section>
    </div>
  );
};
