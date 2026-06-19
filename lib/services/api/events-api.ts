const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

interface userRegister {
  email: string;
  password: string;
}

export class EventsAPI {
  static async signup(user: userRegister) {
    try {
      const response = await fetch(`${BASE_API}/signup`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
