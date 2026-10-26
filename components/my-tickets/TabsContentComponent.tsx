import { Ticket } from "@/types/ticket";
import { TabsContent } from "../ui/tabs";
import { MyTicketCard } from "./MyTicketCard";

export const TabsContentComponent = ({ tickets }: { tickets: Ticket[] }) => {
  const activeTicket = tickets.filter(
    (ticket) => ticket.status_event === "mendatang"
  );
  const expiredTicket = tickets.filter(
    (ticket) => ticket.status_event === "selesai"
  );
  return (
    <>
      <TabsContent value="selesai">
        <div className="flex flex-col gap-3 mt-5">
          {Boolean(expiredTicket.length) ? (
            expiredTicket.map((ticket) => {
              return <MyTicketCard key={ticket.id} {...ticket} />;
            })
          ) : (
            <p className="font-jakarta text-lg">Data tiket tidak tersedia</p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="mendatang">
        <div className="flex flex-col gap-3 mt-5">
          {Boolean(activeTicket.length) ? (
            activeTicket.map((ticket) => {
              return <MyTicketCard key={ticket.id} {...ticket} />;
            })
          ) : (
            <p className="font-jakarta text-lg">Data tiket tidak tersedia</p>
          )}
        </div>
      </TabsContent>
    </>
  );
};
