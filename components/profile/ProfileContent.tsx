"use client";
import { getAccessToken, removeAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle } from "@/lib/toaster-styles";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loading } from "../layout/Loading";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { PersonalEditDialog } from "./PersonalEditDialog";

interface userProfile {
  id?: Number;
  name?: string;
  gender?: string;
  email?: string;
  address?: string;
  phone_number?: string;
  image_thumb?: string;
}

export const ProfileContent = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userProfile>({});

  const getProfileData = async () => {
    const token = await getAccessToken();
    try {
      setLoading(true);
      const response = await EventsAPI.getProfile(token ?? "");
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error("Silahkan login ulang", { style: errorStyle });
        await removeAccessToken();
        signOut({ callbackUrl: "/signin" });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div
      className={`flex flex-col w-full lg:w-3/4 mx-auto pb-10 h-full border-border border-2 shadow-[5px_5px_0px_0px_#323232] mt-20 ${
        loading && "justify-center"
      }`}
    >
      {!loading && (
        <>
          <div className="w-full h-30 bg-gradient"></div>
          <section
            className={`${loading && "blur"} flex flex-col gap-3 px-8 mt-5`}
          >
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <img
                src="/images/profile.webp"
                className="w-[120px] h-[115px] mask-cover rounded-full"
                alt=""
              />

              <div className="flex flex-col items-center md:items-start gap-2 ml-3">
                <h4 className="capitalize font-sans font-bold text-xl">
                  {user?.name ?? "-"}
                </h4>
                <p className="text-black/50 font-grotesk">
                  {user?.email ?? "-"}
                </p>
              </div>

              <div className="flex justify-center items-center mx-auto md:mx-0 md:ml-auto">
                <Button
                  variant="brutalism"
                  size="md"
                  className="font-bold mt-2 bg-red-600 text-white border-black"
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <h4 className="font-bold text-[18px]">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-10 font-grotesk">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Alamat</h2>
                  <p className="px-3 py-2 capitalize bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                    {user?.address ?? "isi Alamat anda"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">No. Handphone</h2>
                  <p className="px-3 py-2 bg-gray capitalize text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                    {user?.phone_number == ""
                      ? "Isi nomor handphone anda"
                      : `+62${user?.phone_number}`}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Jenis Kelamin</h2>
                  <p className="px-3 py-2 capitalize bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                    {user?.gender
                      ? `${
                          user?.gender == "female" ? "Perempuan" : "Laki - Laki"
                        }`
                      : "Isi jenis kelamin anda"}
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <PersonalEditDialog
                    data={user}
                    fetchProfile={getProfileData}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
};
