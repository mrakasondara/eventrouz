"use server";

import { EventsAPI } from "@/lib/services/api/events-api";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";
import { ticketStore } from "@/types/api";

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

export const updateEventState = async (
  prevState: ActionResponse,
  formData: FormData,
  id: number | undefined
): Promise<ActionResponse> => {
  try {
    const token = await getAccessToken();
    const response = await EventsAPI.updateEvent({ formData, token, id });
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
    return {
      success: false,
      message: "Something error!",
    };
  }
};

export const deleteEventState = async (
  prevState: ActionResponse,
  id: string | undefined
): Promise<ActionResponse> => {
  try {
    const token = await getAccessToken();
    const response = await EventsAPI.deleteEvent({ id, token: token ?? "" });
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
    return {
      success: false,
      message: "Something error!",
    };
  }
};

export const addTicketState = async (
  prevState: ActionResponse,
  id: string | undefined,
  body: ticketStore
): Promise<ActionResponse> => {
  try {
    const token = await getAccessToken();
    const response = await EventsAPI.addTicket({
      id,
      token: token ?? "",
      body,
    });
    if (response.success) {
      revalidatePath("/admin/tickets");
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
    return {
      success: false,
      message: "Something error!",
    };
  }
};

export const deleteTicketState = async (
  prevState: ActionResponse,
  eventId: string | undefined,
  ticketId: string | undefined
): Promise<ActionResponse> => {
  try {
    const token = await getAccessToken();
    const response = await EventsAPI.deleteTicket({
      eventId,
      ticketId,
      token: token ?? "",
    });
    if (response?.success) {
      revalidatePath("/admin/tickets");
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
    return {
      success: false,
      message: "Something error!",
    };
  }
};
