const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

interface userRegister {
  name?: string;
  email: string;
  password: string;
}

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

  static async logout(token) {
    try {
      const response = await fetch(`${BASE_API}/logout`, {
        method: "POST",
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
  }
}
