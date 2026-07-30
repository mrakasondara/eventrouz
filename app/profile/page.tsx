import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import { ProfileContent } from "@/components/profile/ProfileContent";

export const metadata = { title: "Halaman Profil" };
export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <ProfileContent />
    </div>
  );
}
