import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export const TableOrdersActions = ({ id }: { id: number | undefined }) => {
  return (
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
          <Link href={`orders/inv-etz-${id}`}>
            <DropdownMenuItem className="cursor-pointer">
              Detail Transaksi
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
