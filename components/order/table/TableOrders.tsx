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
import { badgeIcon } from "@/components/admin/orders/table/TableOrders";

export const TableOrders = ({ orders }: { orders: Order[] }) => {
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
