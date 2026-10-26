"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableOrdersActions } from "./TableOrdersActions";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { getSingleDate } from "@/lib/date";

export const badgeIcon = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-md py-1 px-2">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300 rounded-md py-1 px-2">
          Pending
        </Badge>
      );
    default:
      return (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-md py-1 px-2">
          Failed
        </Badge>
      );
  }
};

export const TableOrders = ({ orders }: { orders: Order[] }) => {
  return (
    <section className="flex flex-col gap-2 mt-5">
      {!orders.length && (
        <TableCaption>Daftar tranaksi tidak tersedia.</TableCaption>
      )}
      <Table>
        <TableHeader className="bg-gray font-sans font-semibold">
          <TableRow>
            <TableHead className="w-[40px]">ID</TableHead>
            <TableHead>Email pengguna</TableHead>
            <TableHead>Total transaksi</TableHead>
            <TableHead>Tgl pesan</TableHead>
            <TableHead>Status transaksi</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length &&
            orders.map((order: Order) => {
              return (
                <TableRow key={order.id} className="font-jakarta">
                  <TableCell className="font-medium uppercase">
                    inv-etz-{order.id}
                  </TableCell>
                  <TableCell>{order?.user?.email}</TableCell>
                  <TableCell>
                    Rp. {order?.total_price?.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    {getSingleDate({
                      date: order?.created_at,
                      type: "short",
                    })}
                  </TableCell>
                  <TableCell>{badgeIcon(order?.status)}</TableCell>
                  <TableCell className="text-right">
                    <TableOrdersActions id={order?.id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
};
