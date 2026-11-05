"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Keyboard, Ticket } from "lucide-react";
import { checkinResult } from "./ScanTicketContent";
import { getAccessToken } from "@/app/actions/auth";
import { EventsAPI } from "@/lib/services/api/events-api";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ManualEntryProps {
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResultShow: React.Dispatch<React.SetStateAction<boolean>>;
  result: checkinResult;
  setResult: React.Dispatch<React.SetStateAction<checkinResult | {}>>;
}

export const ManualEntry = ({
  setIsCameraActive,
  setIsResultShow,
  result,
  setResult,
}: ManualEntryProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketCode, setTicketCode] = useState<string>("");

  const checkInTicket = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const token = (await getAccessToken()) ?? "";

    setLoading(true);
    try {
      const response = await EventsAPI.checkinTicket({ token, ticketCode });
      setIsResultShow(true);
      setResult({
        success: response?.success,
        data: response?.data,
        message: response?.message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsCameraActive(false);
    }
  };

  return (
    <div className="w-full md:w-[38%] flex flex-col gap-4">
      <div className="w-full border-4 -translate-y-1 shadow-[6px_6px_0px_0px_#323232] bg-blue flex flex-col gap-2 py-3 px-4 md:-rotate-1 self-start min-h-80">
        <div className="flex flex-col gap-2 mt-1 mb-3">
          <div className="flex gap-2 items-center">
            <Keyboard strokeWidth={2.5} />
            <h2 className="text-xl uppercase font-extrabold font-jakarta">
              manual entry
            </h2>
          </div>

          <p className="px-2 py-1 bg-white text-sm self-start border-2 shadow-[3px_3px_0px_0px_#323232] font-semibold mt-2">
            Scanner rusak? Masukan code manual.
          </p>

          <form className="flex flex-col gap-4 mt-8" onSubmit={checkInTicket}>
            <Input
              type="text"
              placeholder="MASUKKAN KODE TIKET..."
              className="p-5 focus:border-black focus-visible:border-b-black border-black bg-white uppercase text-lg border-2 shadow-[3px_3px_0px_0px_#323232] font-bold"
              onChange={(e) => setTicketCode(e.target.value)}
            />
            <Button
              type="submit"
              variant="brutalism"
              size="md"
              className="text-md font-bold bg-lime uppercase"
            >
              {loading && <Spinner />} check in
            </Button>
          </form>
        </div>
      </div>

      <div className="w-full border-4 -translate-y-1 shadow-[6px_6px_0px_0px_#323232] bg-white flex flex-col gap-2 py-3 px-4 md:rotate-1 self-start min-h-40">
        <div className="flex flex-col gap-2 mt-1 mb-3">
          <div className="flex gap-2 items-center border-b-2 pb-2">
            <Ticket strokeWidth={2.5} />
            <h2 className="text-xl uppercase font-extrabold font-jakarta">
              event statistic
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 font-bold uppercase mt-2">
            <div className="flex flex-col justify-center items-center py-3 border-3 shadow-[3px_3px_0px_0px_#323232] border-black bg-green-200">
              <h3 className="text-2xl text-green-700">
                {result?.data?.event_statistic?.total_checkedin ?? 0}
              </h3>
              <p className="text-sm">checked in</p>
            </div>
            <div className="flex flex-col justify-center items-center py-3 border-3 shadow-[3px_3px_0px_0px_#323232] border-black bg-amber-200">
              <h3 className="text-2xl text-amber-600">
                {result?.data?.event_statistic?.remaining ?? 0}
              </h3>
              <p className="text-sm">remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
