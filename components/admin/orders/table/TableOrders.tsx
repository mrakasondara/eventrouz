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
import { Order } from "@/types/event";

export const TableOrders = ({ orders }: { orders: Order[] }) => {
  const statusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray";

      case "expired":
        return "bg-red-500 text-white";

      case "paid":
        return "bg-green-500 text-white";

      default:
        return "bg-slate-200";
    }
  };
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
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order?.user?.email}</TableCell>
                  <TableCell>
                    Rp. {order?.total_price?.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{order?.created_at}</TableCell>
                  <TableCell>
                    <span
                      className={`${statusStyle(
                        order?.status ?? ""
                      )} px-2 py-1 uppercase font-semibold`}
                    >
                      {order?.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right"></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
};
