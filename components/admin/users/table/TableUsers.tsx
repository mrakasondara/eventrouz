"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRelativeDate, getSingleDate } from "@/lib/date";
import { DeleteUsersDialog } from "./DeleteUsersDialog";

interface User {
  id?: number;
  name?: string;
  email?: string;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}

export const TableUsers = ({ users }: { users: User[] }) => {
  return (
    <section className="flex flex-col gap-2 mt-5">
      {!users.length && (
        <TableCaption>Daftar pengguna tidak tersedia.</TableCaption>
      )}
      <Table>
        <TableHeader className="bg-gray font-sans font-semibold">
          <TableRow>
            <TableHead className="w-[40px]">ID</TableHead>
            <TableHead>Nama Pengguna</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tgl Dibuat</TableHead>
            <TableHead>Tgl Diubah</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length &&
            users.map((user: User) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        {getRelativeDate(user.created_at)}
                      </TooltipTrigger>
                      <TooltipContent>
                        {getSingleDate({
                          date: user.created_at ?? "",
                          type: "short",
                        })}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        {getRelativeDate(user.updated_at)}
                      </TooltipTrigger>
                      <TooltipContent>
                        {getSingleDate({
                          date: user.updated_at ?? "",
                          type: "short",
                        })}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteUsersDialog userId={user.id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </section>
  );
};
