import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { History, Search, XIcon } from "lucide-react";
import Link from "next/link";
export const SearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="brutalism" size="icon-sm" />}>
        <Search />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md shadow-[8px_8px_0px_0px_#323232] hover:shadow-[4px_4px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader className="w-full p-1">
          <form action="" className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="search" className="sr-only hidden" aria-hidden>
                search
              </label>
              <Input
                className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
                id="search"
                placeholder="Search events"
                type="text"
              />
            </div>
          </form>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex justify-between items-center font-semibold text-[15px] text-muted-foreground">
            <h6 className="text-[15px] uppercase">pencarian terakhir</h6>
            <span className="text-sm capitalize hover:text-red-500 cursor-pointer">
              hapus
            </span>
          </div>
          <ol className="flex flex-col mt-4 gap-4 text-black/70">
            <li>
              <Link
                href="/events?search="
                className="flex gap-2 items-center hover:text-black transition cursor-pointer"
              >
                <History /> <p>Tech stack</p>
                <XIcon className="ml-auto hover:text-red-500 cursor-pointer size-5" />
              </Link>
            </li>
          </ol>
        </div>
        <DialogFooter className="w-full flex flex-row! justify-center! p-1 gap-4 text-black/70 text-[13px]">
          <p className="flex gap-1 items-center">
            <span className="border px-1 text-black/70">Enter</span>
            Cari
          </p>
          <p className="flex gap-1 items-center">
            <span className="border px-1 text-black/70">Esc</span>
            Tutup
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
