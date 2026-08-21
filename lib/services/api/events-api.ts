import {
  typeHandlerAuthAPI,
  userRegister,
  getEvents,
  editPersonalInformation,
  getTicketCategories,
  getTicketDetail,
  updateTicket,
  getUsers,
  getOrders,
} from "@/types/api";
import { addTicketCategories } from "../../../types/api";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const handlerAuthAPI = async ({
  url,
  method,
  token,
  body,
  isImageUpload,
}: typeHandlerAuthAPI) => {
  try {
    const headersWithoutImage = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const headersWithImage = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${url}`, {
      method,
      headers: isImageUpload ? headersWithImage : headersWithoutImage,
      body,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export class EventsAPI {
  // auth

  static async register(user: userRegister) {
    try {
      const response = await fetch(`${BASE_API}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async login(user: userRegister) {
    try {
      const response = await fetch(`${BASE_API}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async logout(token: string) {
    const url = `${BASE_API}/logout`;
    const method = "POST";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }

  // user

  static async getUsers({ token, limit, search }: getUsers) {
    const searchParams = new URLSearchParams();

    if (limit) searchParams.set("limit", String(limit));
    if (search) searchParams.set("search", String(search));

    const url = `${BASE_API}/users?${searchParams.toString()}`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }

  static async getProfile(token: string) {
    const url = `${BASE_API}/profile`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }

  static async editPersonalInformation({
    token,
    data,
  }: editPersonalInformation) {
    const url = `${BASE_API}/profile/personal-information`;
    const method = "PUT";

    const body = JSON.stringify(data);

    return await handlerAuthAPI({
      url,
      method,
      token,
      body,
      isImageUpload: false,
    });
  }

  // events
  static async getEvents({ limit, search, status }: getEvents) {
    const searchParams = new URLSearchParams();

    if (limit) searchParams.set("limit", String(limit));
    if (search) searchParams.set("search", String(search));
    if (status) searchParams.set("status", String(status));

    try {
      const response = await fetch(
        `${BASE_API}/events?${searchParams.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async getEventDetail(id: number | undefined) {
    try {
      const response = await fetch(`${BASE_API}/events/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async addEvent({ formData, token }: { formData: any; token: any }) {
    const url = `${BASE_API}/events`;
    const method = "POST";

    return await handlerAuthAPI({
      url,
      method,
      token,
      body: formData,
      isImageUpload: true,
    });
  }

  static async updateEvent({
    formData,
    token,
    id,
  }: {
    formData: any;
    token: any;
    id: number | undefined;
  }) {
    const url = `${BASE_API}/events/${id}`;
    const method = "POST";

    return await handlerAuthAPI({
      url,
      method,
      token,
      body: formData,
      isImageUpload: true,
    });
  }

  static async deleteEvent({
    id,
    token,
  }: {
    id: string | undefined;
    token: string | undefined;
  }) {
    const url = `${BASE_API}/events/${id}`;
    const method = "DELETE";

    return await handlerAuthAPI({
      url,
      method,
      token,
      isImageUpload: false,
    });
  }

  static async getEventsOptions(token: string | undefined) {
    const url = `${BASE_API}/events/options`;
    const method = "GET";

    return await handlerAuthAPI({
      url,
      method,
      token,
      isImageUpload: false,
    });
  }

  // tickets
  static async getTickets({ search, token }: getTicketCategories) {
    const searchParams = new URLSearchParams();

    if (search) searchParams.set("search", String(search));

    const url = `${BASE_API}/events/ticket-categories?${searchParams.toString()}`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }

  static async addTicket({ id, token, body }: addTicketCategories) {
    const url = `${BASE_API}/events/${id}/ticket-categories`;
    const method = "POST";

    return await handlerAuthAPI({
      url,
      method,
      token,
      body: JSON.stringify(body),
      isImageUpload: false,
    });
  }

  static async getTicketDetail({ token, eventId, ticketId }: getTicketDetail) {
    const url = `${BASE_API}/events/${eventId}/ticket-categories/${ticketId}`;
    const method = "GET";

    return await handlerAuthAPI({
      url,
      method,
      token,
      isImageUpload: false,
    });
  }

  static async updateTicket({ token, eventId, ticketId, body }: updateTicket) {
    const url = `${BASE_API}/events/${eventId}/ticket-categories/${ticketId}`;
    const method = "PUT";

    return await handlerAuthAPI({
      url,
      method,
      token,
      body: JSON.stringify(body),
      isImageUpload: false,
    });
  }

  static async deleteTicket({
    eventId,
    ticketId,
    token,
  }: {
    eventId: string | undefined;
    ticketId: string | undefined;
    token: string | undefined;
  }) {
    const url = `${BASE_API}/events/${eventId}/ticket-categories/${ticketId}`;
    const method = "DELETE";

    return await handlerAuthAPI({
      url,
      method,
      token,
      isImageUpload: false,
    });
  }

  // orders

  static async getOrders({ token, limit, status }: getOrders) {
    const searchParams = new URLSearchParams();

    if (limit) searchParams.set("limit", String(limit));
    if (status) searchParams.set("status", String(status));

    const url = `${BASE_API}/orders?${searchParams.toString()}`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }
}
