import { Button } from "@/components/ui/button";
import { rupiahFormatter } from "@/lib/formatter";
import { snapPay } from "@/lib/services/midtrans";
import { Payment } from "@/types/order";
import { useSession } from "next-auth/react";

export const PaymentSummary = ({
  status,
  total_price,
  data,
  token,
}: {
  status: string;
  total_price: number;
  data: Payment | null;
  token: string | null;
}) => {
  const { data: session } = useSession();
  const { payment_type, bank, va_number, paid_at, gross_amount } = data || {};
  const role = session?.user?.role;

  return (
    <div className="flex flex-col gap-2 mt-1 text-sm text-black/80">
      {status == "paid" && (
        <>
          <div className="flex justify-between capitalize">
            <p>Metode Pembayaran</p>
            <p>
              {payment_type ?? ""}
              {Boolean(bank) ?? `- ${bank}`}
            </p>
          </div>

          {Boolean(va_number) && (
            <div className="flex justify-between capitalize">
              <p>Va Number</p>
              <p>{va_number}</p>
            </div>
          )}

          <div className="flex justify-between capitalize">
            <p>Tgl Pembayaran</p>
            <p>{paid_at ?? ""}</p>
          </div>
        </>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex justify-between capitalize text-black font-semibold mt-1">
          <p>Total Bayar</p>
          <p>
            {rupiahFormatter.format(
              status == "paid"
                ? Number(gross_amount ?? "0")
                : Number(total_price ?? "0")
            )}
          </p>
        </div>

        {status != "paid" && role == "user" && (
          <Button
            variant="brutalism"
            className="bg-blue block w-40 ml-auto"
            size="sm"
            type="submit"
            onClick={() => snapPay(token ?? "")}
          >
            Bayar Sekarang
          </Button>
        )}
      </div>
    </div>
  );
};
