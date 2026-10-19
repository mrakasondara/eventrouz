import { TableOrders } from "./table/TableOrders";

export const OrdersContent = ({ response }: { response: any }) => {
  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full mt-20">
      <section className="flex flex-col md:flex-row gap-5 font-grotesk md:items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Daftar Transaksi</h2>
        </div>
      </section>

      <TableOrders orders={response?.data} />
    </div>
  );
};
