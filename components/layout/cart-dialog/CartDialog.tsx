"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";
import { Button } from "../../ui/button";
import { HeartIcon, ShoppingCart, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/app/actions/auth";

export const CartDialog = () => {
  const {
    cart,
    isLoading,
    fetchCart,
    addToCart,
    removeItem,
    clearCart,
    getTotalItems,
  } = useCartStore();

  const totalItems = getTotalItems();
  const [listCart, setListCart] = useState([]);

  const initialCart = async () => {
    const token = await getAccessToken();
    fetchCart(token ?? "");
  };

  useEffect(() => {
    initialCart();
  }, [fetchCart]);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="brutalism"
            size="icon-sm"
            className="hidden md:flex"
          />
        }
      >
        <ShoppingCart />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg shadow-[8px_8px_0px_0px_#323232] hover:shadow-[4px_4px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader>
          <h2 className="text-[16px] uppercase font-semibold">
            keranjang anda
          </h2>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {isLoading && (
            <div className="p-8 text-center">Memuat keranjang...</div>
          )}
          {!totalItems && (
            <h3 className="text-[16px] text-center capitalize font-semibold">
              Wah keranjang anda kosong
            </h3>
          )}
          {Boolean(totalItems) &&
            cart?.items.map((item) => {
              const formatter = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              });

              return (
                <div className="flex flex-col gap-2 border-b-1" key={item.id}>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <h3 className="text-[16px] uppercase font-bold">
                        {/* {Boolean(item.is_package) && (
                          <>
                            <span className="bg-blue px-1 text-white uppercase font-bold">
                              tiket bundle
                            </span>{" "}
                            -
                          </>
                        )}{" "} */}
                        {item["ticket_category"]?.name}
                      </h3>
                      <input
                        type="checkbox"
                        id={String(item.id)}
                        value={item["ticket_category"]?.id}
                        className="text-xl w-5 h-5 ml-auto has-checked:bg-blue has-checked:text-white"
                        // onChange={listCart.find((cart) => cart.id === item.id)}
                      />
                    </div>
                    <h4 className="text-[14px] font-semibold">
                      {/* {item.event_name} */}
                    </h4>
                    <div className="flex gap-1">
                      <h5 className="text-[12px] text-slate-500">
                        Tanggal berlaku tiket :{" "}
                        {Array.isArray(item.event_ticket_date)
                          ? item.event_ticket_date.join(", ")
                          : item.event_ticket_date}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 -mb-2">
                    <h5 className="text-[13px] flex items-center font-semibold">
                      {formatter.format(item["ticket_category"]?.price ?? 0)} *{" "}
                      {item.total_ticket}
                    </h5>
                    <h6 className="text-[14px] font-bold">
                      {formatter.format(
                        Number(item["ticket_category"]?.price ?? 0) *
                          Number(item?.total_ticket ?? 0)
                      )}
                    </h6>
                  </div>
                  <div className="flex p-1 justify-end">
                    <Button
                      variant="ghost"
                      className="font-grotesk text-[11px] flex items-center cursor-pointer"
                      size="xs"
                    >
                      Pindahkan ke Wishlist <HeartIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      className="font-grotesk text-[11px] flex items-center cursor-pointer"
                      size="xs"
                      // onClick={() => removeFromCart(item?.id ?? "")}
                    >
                      Hapus <TrashIcon />
                    </Button>
                  </div>
                </div>
              );
            })}

          {Boolean(totalItems) && (
            <div className="flex justify-between border-2 p-3">
              <div className="flex flex-col font-semibold">
                <p className="text-sm">Total Harga</p>
                <h6 className="text-blue">Rp. 343.000</h6>
              </div>
              <Button variant="brutalism" className="bg-blue" size="sm">
                Beli
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
