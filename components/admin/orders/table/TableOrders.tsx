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
import { TableOrdersActions } from "./TableOrdersActions";

export const statusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-[#fffb00] border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#000]";

    case "expired":
      return "bg-[#ff5959] border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#000]";

    case "paid":
      return "bg-[#8bff59] border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#000]";

    default:
      return "bg-slate-200 border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#000]";
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
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order?.user?.email}</TableCell>
                  <TableCell>
                    Rp. {order?.total_price?.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{order?.created_at}</TableCell>
                  <TableCell>
                    <span className={`${statusStyle(order?.status ?? "")}`}>
                      {order?.status}
                    </span>
                  </TableCell>
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
