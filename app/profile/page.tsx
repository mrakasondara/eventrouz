import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }
  return <h1>Profile Page</h1>;
}
