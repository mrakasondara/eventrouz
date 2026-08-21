"use server";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return token || null;
}

export async function removeAccessToken() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  return { success: true };
}
