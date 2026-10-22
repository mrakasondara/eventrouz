"use client";

import {
  successStyle,
  warningStyle,
  infoStyle,
  errorStyle,
} from "@/lib/toaster-styles";
import { toast } from "sonner";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

interface snapPopup {
  token?: string;
  id?: number;
}

export const snapPay = (token: string) => {
  return window?.snap?.pay(token, {
    onSuccess: function (result: any) {
      toast.success("Pembayaran berhasil!", { style: successStyle });
      location.reload();
    },
    onPending: function (result: any) {
      toast.info("Pembayaran tertunda!", { style: infoStyle });
    },
    onError: function (result: any) {
      toast.error("Pembayaran gagal!", { style: errorStyle });
    },
    onClose: function () {
      toast.warning("Pembayaran tertunda!", { style: warningStyle });
    },
  });
};

export const handleSnapPopup = async ({ token, id }: snapPopup) => {
  try {
    const response = await fetch(`${BASE_API}/payment/create/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    const snapToken = responseData?.snapToken;

    snapPay(snapToken);
  } catch (error) {
    console.error(error);
  }
};
