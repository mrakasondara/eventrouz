import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTicketsDialog } from "./DeleteTicketsDialog";
import { useState } from "react";
import { EditTicketDialog } from "../edit-ticket/EditTicketDialog";

export const TableTicketsActions = ({
  eventId,
  ticketId,
}: {
  eventId: number | undefined;
  ticketId: number | undefined;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="bg-transparent cursor-pointer hover:bg-transparent shadow-none border-none text-black hover:translate-0"
              size="sm"
            />
          }
        >
          <EllipsisVertical size={13} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <EditTicketDialog eventId={eventId} ticketId={ticketId} />
            <DeleteTicketsDialog
              eventId={eventId}
              ticketId={ticketId}
              open={open}
              setOpen={setOpen}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
