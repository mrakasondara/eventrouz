const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

interface userRegister {
  name?: string;
  email: string;
  password: string;
}

interface typeHandlerAuthAPI {
  url: string;
  method: string;
  token?: string;
}

interface getEvents {
  limit?: number;
  search?: string;
  status?: string;
}

const handlerAuthAPI = async ({ url, method, token }: typeHandlerAuthAPI) => {
  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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

    return await handlerAuthAPI({ url, method, token });
  }

  // user

  static async getProfile(token: string) {
    const url = `${BASE_API}/profile`;
    const method = "GET";

    return await handlerAuthAPI({ url, method, token });
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
}
