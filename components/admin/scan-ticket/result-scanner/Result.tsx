import { CircleCheckBig, CircleX } from "lucide-react";
import { checkinResult } from "../ScanTicketContent";

export const Result = ({ response }: { response: checkinResult }) => {
  const { success, data, message } = response;
  const Icon = success ? CircleCheckBig : CircleX;
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center border-2 ${
        success ? "bg-green-400" : "bg-red-500"
      } p-5 py-16`}
    >
      <Icon size={88} strokeWidth={2.5} />
      <h2
        className={`uppercase  px-2 pt-2 ${
          success
            ? "bg-white rotate-2 shadow-[3px_3px_0px_0px_#323232]"
            : "bg-black text-white -rotate-2 shadow-[3px_3px_0px_0px_#ffff]"
        } font-extrabold text-4xl border-2 border-black my-3`}
      >
        tiket {success ? "valid" : "tidak valid"}
      </h2>

      {success ? (
        <div className="flex flex-col text-center font-jakarta">
          <h4 className="font-bold capitalize">
            {data?.user_name ?? data?.user_email} - {data?.ticket_category}
          </h4>
          <p className="font-bold text-sm opacity-75">
            #{data?.ticket_code} ({data?.quantity} Orang)
          </p>
        </div>
      ) : (
        <h4 className="font-bold border-2 border-black bg-white">{message}</h4>
      )}
    </div>
  );
};
