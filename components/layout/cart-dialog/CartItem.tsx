import { HeartIcon, TrashIcon } from "lucide-react";
import { CartItem as CartItemInterface, useCartStore } from "@/lib/store";
import { Button } from "../../ui/button";

export const CartItem = ({
  cart,
  listCart,
  addToList,
}: {
  cart: CartItemInterface;
  listCart: CartItemInterface[];
  addToList: (cart: CartItemInterface) => void;
}) => {
  const { isLoading, removeItem, clearCart } = useCartStore();

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const isListed = listCart.find((list) => list?.id === cart?.id);

  return (
    <div className="flex flex-col gap-2 border-b" key={cart.id}>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="text-[16px] uppercase font-bold">
            {Boolean(cart["ticket_category"]?.is_package) && (
              <>
                <span className="bg-blue px-1 text-slate-200 uppercase font-bold">
                  tiket bundle
                </span>{" "}
                -
              </>
            )}{" "}
            {cart["ticket_category"]?.name} |{" "}
            {cart["ticket_category"]?.event?.title}
          </h3>
          <input
            type="checkbox"
            id={String(cart.id)}
            value={cart["ticket_category"]?.id}
            className="text-xl w-5 h-5 ml-auto has-checked:bg-blue has-checked:text-white"
            onChange={() => {
              addToList(cart);
            }}
            checked={Boolean(listCart.length ? isListed : false)}
          />
        </div>
        <h4 className="text-[14px] font-semibold">{/* {cart.event_name} */}</h4>
        <div className="flex gap-1">
          <h5 className="text-[12px] text-slate-500">
            Tanggal berlaku tiket :{" "}
            {Array.isArray(cart.event_ticket_date)
              ? cart.event_ticket_date.join(", ")
              : cart.event_ticket_date}
          </h5>
        </div>
      </div>
      <div className="flex justify-between mt-2 -mb-2">
        <h5 className="text-[13px] flex items-center font-semibold">
          {formatter.format(cart["ticket_category"]?.price ?? 0)} *{" "}
          {cart.total_ticket}
        </h5>
        <h6 className="text-[14px] font-bold">
          {formatter.format(
            Number(cart["ticket_category"]?.price ?? 0) *
              Number(cart?.total_ticket ?? 0)
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
};
