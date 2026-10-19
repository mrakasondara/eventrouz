"use client";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order";
import { rupiahFormatter } from "@/lib/formatter";

export const TableOrders = ({ orders }: { orders: Order[] }) => {
  const badgeIcon = (status: string) => {
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

  return (
    <section className="flex flex-col gap-2 mt-5">
      {!orders.length && (
        <TableCaption>Daftar transaksi tidak tersedia.</TableCaption>
      )}
      <Table>
        <TableHeader className="bg-gray font-sans font-semibold">
          <TableRow>
            <TableHead className="w-[40px]">ID</TableHead>
            <TableHead>Tiket</TableHead>
            <TableHead>Total Transaksi</TableHead>
            <TableHead>Tgl Transaksi</TableHead>
            <TableHead>Status Transaksi</TableHead>
            <TableHead className="text-right">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length &&
            orders.map((order: Order) => {
              const detail = order?.details;
              return (
                <TableRow key={order.id} className="font-jakarta">
                  <TableCell className="font-medium uppercase">
                    inv-etz-{order.id}
                  </TableCell>
                  <TableCell className="capitalize flex items-center gap-2">
                    {detail[0].ticket_category_name}

                    {detail.length > 1 && (
                      <Badge className="border py-1 px-2 rounded-md text-black hover:text-inherit">
                        +{detail.length - 1}
                        <Ticket className="-ml-1" />
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {rupiahFormatter.format(order.total_price)}
                  </TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell className="capitalize">
                    {badgeIcon(order.status)}
                  </TableCell>
                  <TableCell className="text-right capitalize underline">
                    <Link href={`orders/inv-etz-${order.id}`}>
                      Detail Transaksi
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
};
