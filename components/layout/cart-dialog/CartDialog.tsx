"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartItem as CartItemInterface, useCartStore } from "@/lib/store";
import { Button } from "../../ui/button";
import { getAccessToken } from "@/app/actions/auth";
import { CartItem } from "./CartItem";
import { Spinner } from "@/components/ui/spinner";
import { EventsAPI } from "@/lib/services/api/events-api";
import { handleSnapPopup } from "@/lib/services/midtrans";
import { rupiahFormatter } from "@/lib/formatter";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toaster-styles";

export const CartDialog = () => {
  const {
    cart,
    isLoading,
    fetchCart,
    clearCart,
    removeItems,
    removeItem,
    getTotalItems,
  } = useCartStore();
  const totalItems = getTotalItems();

  const [listCart, setListCart] = useState<CartItemInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    return listCart.reduce((acc, val) => {
      const totalTicket = val?.total_ticket ?? 0;
      const price = val?.ticket_category?.price ?? 0;

      return acc + totalTicket * price;
    }, 0);
  }, [listCart]);

  const onClearCart = async () => {
    const token = await getAccessToken();
    if (cart?.items.length == listCart?.length) {
      clearCart(token ?? "");
    } else {
      const ids = listCart.map((list) => list.id);
      const body = { cart_item_ids: ids };
      removeItems(token ?? "", body ?? {});
    }

    fetchCart(token ?? "");
    setListCart([]);
  };

  const checkOut = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formatData = () => {
      return listCart.map((cart) => {
        return {
          ticket_category_id: cart.ticket_category_id,
          event_ticket_date: cart.event_ticket_date.toString(),
          quantity: cart.total_ticket,
        };
      });
    };

    const items = formatData();
    const token = (await getAccessToken()) ?? "";
    try {
      setLoading(true);
      const response = await EventsAPI.addOrder({ token, items });
      if (response.success) {
        await handleSnapPopup({ token, id: response.data.id ?? 0 });

        listCart.forEach((cart) => removeItem(token, cart.id));

        fetchCart(token ?? "");
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        render={<Button variant="brutalism" size="icon-sm" className="flex" />}
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

          {!totalItems && !isLoading && (
            <h3 className="text-[16px] text-center capitalize">
              Wah keranjang anda kosong
            </h3>
          )}

          {!isLoading &&
            Boolean(totalItems) &&
            cart?.items.map((item) => {
              return (
                <CartItem
                  cart={item}
                  listCart={listCart}
                  setListCart={setListCart}
                  key={item.id}
                />
              );
            })}

          {Boolean(listCart.length) && (
            <form
              className="flex justify-between border-2 p-3"
              onSubmit={checkOut}
            >
              <div className="flex flex-col font-semibold">
                <p className="text-sm">Total Harga</p>
                <h6 className="font-bold">
                  {rupiahFormatter.format(totalPrice ?? 0)}
                </h6>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="link"
                  size="xs"
                  className="self-end hover:text-red-600 font-sans cursor-pointer capitalize transition ease-in-out"
                  onClick={onClearCart}
                >
                  {isLoading && <Spinner />} Hapus item
                </Button>
                <Button
                  variant="brutalism"
                  className="bg-blue"
                  size="sm"
                  type="submit"
                >
                  {loading && <Spinner />} Beli
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
