import { getSingleDate } from "@/lib/date";
import { ShoppingCart } from "lucide-react";
import { TableOrders } from "./table/TableOrders";

export const AdminOrdersContent = ({ orders }: { orders: any }) => {
  const latestUpdate = orders?.data[0].created_at;

  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20">
      <section className="flex flex-col md:flex-row gap-5 font-grotesk md:items-center">
        <p className="p-3 border-2 bg-blue shadow-[3px_3px_0px_0px_#323232] self-start">
          <ShoppingCart size={30} color="white" />
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Daftar Transaksi</h2>
          <p className="text-sm text-muted-foreground">
            Transaksi terakhir{" "}
            {latestUpdate !== ""
              ? getSingleDate({ date: latestUpdate ?? "", type: "full" })
              : "-"}
          </p>
        </div>
        {/* <AddTicketDialog /> */}
      </section>

      <TableOrders orders={orders?.data} />
    </div>
  );
};
