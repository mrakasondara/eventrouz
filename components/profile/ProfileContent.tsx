"use client";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { errorStyle } from "@/lib/toaster-styles";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loading } from "../layout/Loading";
import { Button } from "../ui/button";

interface userProfile {
  id?: Number;
  name?: String;
  gender?: String;
  email?: String;
  address?: String;
  phone_number?: String;
  image_thumb?: String;
}

export const ProfileContent = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userProfile>({});

  const getProfileData = async () => {
    const token = await getAccessToken();
    try {
      setLoading(true);
      const response = await EventsAPI.getProfile(token ?? "");
      console.log(response);
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
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
      className={`flex flex-col w-full lg:w-3/4 mx-auto pb-[6rem] h-full border-border border-2 shadow-[5px_5px_0px_0px_#323232] ${
        loading && "justify-center"
      }`}
    >
      <div className="w-full h-20 bg-gradient"></div>

      <section className={`${loading && "blur"} flex flex-col gap-3 px-8 mt-1`}>
        {!loading && (
          <>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <img
                src="/images/profile.webp"
                className="w-[120px] h-[115px] mask-cover rounded-full"
                alt=""
              />

              <div className="flex flex-col font-grotesk items-center md:items-start gap-2 ml-3">
                <h4 className="capitalize font-bold text-xl">
                  {user?.name ?? "-"}
                </h4>
                <p className="text-black/50">{user?.email ?? "-"}</p>
              </div>

              <div className="flex justify-center items-center mx-auto md:mx-0 md:ml-auto">
                <Button
                  variant="brutalism"
                  size="md"
                  className="font-bold mt-2 bg-blue"
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-10 mt-2">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Address</h2>
                <p className="px-3 py-2 capitalize bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                  {user?.address ?? "Fill your address"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Phone Number</h2>
                <p className="px-3 py-2 bg-gray capitalize text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                  {user?.phone_number ?? "Fill your phone number"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Gender</h2>
                <p className="px-3 py-2 capitalize bg-gray text-sm border-border border shadow-[3px_3px_0px_0px_#323232]">
                  {user?.gender ?? "Fill your gender"}
                </p>
              </div>
              <div className="flex items-end justify-end">
                <Button
                  variant="brutalism"
                  size="md"
                  className="font-bold bg-blue"
                >
                  Edit
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
      {loading && <Loading />}
    </div>
  );
};
