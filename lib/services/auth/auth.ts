import { cookies } from "next/headers";

export const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  return cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};
