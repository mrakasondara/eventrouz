import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDialog } from "./DeleteDialog";
import { useState } from "react";

export const TableActions = ({ id }: { id: number | undefined }) => {
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
            <DropdownMenuItem className="cursor-pointer">Ubah</DropdownMenuItem>

            <DeleteDialog id={id} open={open} setOpen={setOpen} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
