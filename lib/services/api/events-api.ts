import {
  typeHandlerAuthAPI,
  userRegister,
  getEvents,
  editPersonalInformation,
  getTicketCategories,
} from "@/types/api";
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

  // tickets
  static async getTickets({ search, token }: getTicketCategories) {
    const searchParams = new URLSearchParams();

    if (search) searchParams.set("search", String(search));

    const url = `${BASE_API}/events/ticket-categories?${searchParams.toString()}`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token, isImageUpload: false });
  }
}
