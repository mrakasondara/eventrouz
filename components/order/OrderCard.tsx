"use client";
import { ShoppingCart, Ticket } from "lucide-react";
import Link from "next/link";
import { rupiahFormatter } from "@/lib/formatter";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { badgeIcon } from "../admin/orders/table/TableOrders";

export const OrderCard = ({
  id,
  status,
  total_price,
  created_at,
  details,
}: Order) => {
  const getTotalTicket = details?.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <article className="flex flex-col gap-2 border-5 font-jakarta shadow-[8px_8px_0px_0px_#323232]">
      <div className="flex justify-between p-3 border-b-4 items-center bg-gray">
        <div className="flex flex-col gap-1">
          <p className="uppercase text-xs font-medium">order id</p>
          <h2 className="uppercase text-sm font-bold">inv-etz-{id}</h2>
        </div>
        {badgeIcon(status)}
      </div>

      <div className="flex flex-col gap-2 py-4 px-3 md:px-6 border-b-4">
        <div className="flex gap-2 items-center">
          <h3 className="font-bold uppercase text-xl font-sans truncate">
            {details[0].ticket_category_name}
          </h3>

          {details.length > 1 && (
            <p className="text-xs flex items-center">
              +{details.length - 1} <Ticket className="ml-1" size={18} />
            </p>
          )}
        </div>
        <p className="flex px-2 py-1 items-center border-2 gap-1 self-start text-sm font-medium bg-beige">
          <ShoppingCart size={15} className="hidden md:block" /> Beli :{" "}
          {created_at}
        </p>

        <div className="flex flex-col gap-1 mt-6 font-bold">
          <p className="uppercase text-xs text-slate-500">
            total ({getTotalTicket} tiket)
          </p>
          <h4 className="text-lg"> {rupiahFormatter.format(total_price)}</h4>
        </div>
      </div>

      <div className="flex p-3">
        <Link href={`orders/inv-etz-${id}`} className="w-full">
          <Button variant="brutalism" size="md" className="bg-blue w-full">
            detail transaksi
          </Button>
        </Link>
      </div>
    </article>
  );
};
