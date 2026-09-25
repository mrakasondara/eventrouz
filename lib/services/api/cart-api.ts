const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

interface typeHandlerAuthAPI {
  url: string;
  method: string;
  token?: string;
  body?: Record<string, any> | any[] | string;
}

const handlerAuthAPI = async ({
  url,
  method,
  token,
  body,
}: typeHandlerAuthAPI) => {
  try {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const formattedBody =
      body && typeof body === "object" ? JSON.stringify(body) : body;

    const response = await fetch(`${url}`, {
      method,
      headers,
      body: formattedBody,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export class CartAPI {
  static async getCartItems(token: string) {
    const url = `${BASE_API}/cart`;
    const method = "GET";
    return await handlerAuthAPI({ url, method, token });
  }

  static async addCartItems(
    token: string,
    body: Record<string, any> | any[] | string
  ) {
    const url = `${BASE_API}/cart`;
    const method = "POST";
    return await handlerAuthAPI({ url, method, token, body });
  }

  static async removeCartItems(token: string, id: number) {
    const url = `${BASE_API}/cart/${id}`;
    const method = "DELETE";
    return await handlerAuthAPI({ url, method, token });
  }

  static async clearCart(token: string) {
    const url = `${BASE_API}/cart`;
    const method = "DELETE";
    return await handlerAuthAPI({ url, method, token });
  }
}
