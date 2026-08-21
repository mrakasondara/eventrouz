import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Loading } from "@/components/layout/Loading";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { AdminUsersContent } from "@/components/admin/users/AdminUsersContent";

export const metadata = { title: "Halaman Daftar Pengguna" };

export default async function AdminUsers() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  const token = await getAccessToken();
  const users = await EventsAPI.getUsers({ token: token ?? "" });

  if (!users.success) {
    return redirect("/signin?reason=invalid_token", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-12 h-[50rem]">
      <Suspense fallback={<Loading />}>
        <AdminUsersContent users={users} />
      </Suspense>
    </div>
  );
}
