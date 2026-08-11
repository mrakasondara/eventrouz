"use server";

import { EventsAPI } from "@/lib/services/api/events-api";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";

export type ActionResponse = {
  success: boolean;
  message: string;
};

export const addEventState = async (
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const token = await getAccessToken();
    const response = await EventsAPI.addEvent({ formData, token });
    if (response?.success) {
      revalidatePath("/admin/events");
      return {
        success: true,
        message: response.message,
      };
    } else {
      if (response.message == "Unauthenticated.") {
        return {
          success: false,
          message: "Sesi kedaluarsa, silahkan login ulang",
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something error!",
    };
  }
};
