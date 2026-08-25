"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAccessToken } from "@/app/actions/auth";
import { Loading } from "@/components/layout/Loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle } from "@/lib/toaster-styles";
import { statusStyle } from "../table/TableOrders";
import { Detail, OrderDetail } from "@/types/event";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DetailOrderDialog = ({ id }: { id: number | undefined }) => {
  const [order, setOrder] = useState<OrderDetail>({});
  const [loading, setLoading] = useState<boolean>(false);

  const getOrderDetail = async () => {
    try {
      setLoading(true);
      const token = (await getAccessToken()) ?? "";
      const response = await EventsAPI.getOrderDetail({ token, id });
      if (response.success) {
        setOrder(response.data);
        console.log(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("Something error", { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="group/dropdown-menu-item relative flex items-center gap-2.5 rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase outline-hidden select-none hover:bg-gray w-full cursor-pointer">
        Detail transaksi
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        className="sm:max-w-md md:max-w-xl shadow-[8px_8px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk"
      >
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
        </DialogHeader>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col mt-2">
            <section className="flex justify-between">
              <p className="text-sm">{order?.created_at}</p>
              <p className={`${statusStyle(order?.status ?? "")}`}>
                {order?.status}
              </p>
            </section>

            <section className="flex flex-col gap-3 mt-7">
              {order?.details?.map((detail: Detail, index) => {
                return (
                  <div
                    className="flex flex-col gap-2 p-2 border-t-2 border-b-2"
                    key={index}
                  >
                    <div className="flex flex-col gap-1">
                      <h5>
                        <span className="font-semibold uppercase text-lg">
                          {detail?.event_title}
                        </span>{" "}
                        - {detail?.ticket_category_name}
                      </h5>
                      <div className="text-[13px] flex items-center gap-2">
                        {order?.status === "paid" && (
                          <QrCode className="cursor-pointer hover:text-blue-500" />
                        )}
                        <p>#{detail?.ticket_code}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="text-[13px]">x{detail?.quantity}</p>
                      <p>Rp. {detail?.price?.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between">
                  <p className="font-bold uppercase">Total</p>
                  <p>Rp. {order?.total_price?.toLocaleString("id-ID")}</p>
                </div>
                {order?.status === "pending" && (
                  <p className="text-xs text-amber-600">
                    Silahkan lanjutkan pembayaran untuk mendapatkan QR Code
                  </p>
                )}
              </div>

              {order?.status === "pending" && (
                <Button
                  variant="brutalism"
                  size="md"
                  className="bg-blue text-md font-semibold transition ease-in-out mt-2"
                >
                  Bayar Sekarang
                </Button>
              )}
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
