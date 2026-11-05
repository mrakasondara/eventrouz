import { ScanTicketContent } from "@/components/admin/scan-ticket/ScanTicketContent";

export const metadata = { title: "Pindai Tiket" };

export default async function ScanTicket() {
  return (
    <div className="flex flex-col gap-3 px-5 py-12 bg-[url('/images/pattern.avif')]">
      <ScanTicketContent />
    </div>
  );
}
