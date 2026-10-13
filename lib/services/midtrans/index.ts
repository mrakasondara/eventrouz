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

    window?.snap?.pay(snapToken, {
      onSuccess: function (result: any) {
        toast.success("Pembayaran berhasil!", { style: successStyle });
      },
      onPending: function (result: any) {
        toast.info("Pembayaran berhasil!", { style: infoStyle });
      },
      onError: function (result: any) {
        toast.error("Pembayaran berhasil!", { style: errorStyle });
      },
      onClose: function () {
        toast.warning("Pembayaran berhasil!", { style: warningStyle });
      },
    });
  } catch (error) {
    console.error(error);
  }
};
