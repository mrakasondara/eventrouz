"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { History, Search, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchDialogHistory } from "@/lib/search-dialog";

export const SearchDialog = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [historyList, setHistoryList] = useState([]);

  const onSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchHistory = {
      id: +new Date(),
      title: searchValue,
      url: `/events?search=${searchValue}`,
    };

    const params = new URLSearchParams(searchParams);
    if (searchValue !== "") {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    SearchDialogHistory.addToHistory(searchHistory);
    setSearchValue("");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setTimeout(() => setOpen(false), 400);
  };

  const getHistoryList = () => {
    const list = SearchDialogHistory.getHistory();
    return setHistoryList(list);
  };

  const handlerDeleteHistory = (id: number) => {
    SearchDialogHistory.deleteFromHistory(id);
    getHistoryList();
  };

  const handlerDeleteAllHistory = () => {
    SearchDialogHistory.deleteAllFromHistory();
    getHistoryList();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getHistoryList();
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="brutalism"
            size="icon-sm"
            className="hidden md:flex"
          />
        }
      >
        <Search />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md shadow-[8px_8px_0px_0px_#323232] hover:shadow-[4px_4px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader className="w-full p-1">
          <form className="flex items-center gap-2" onSubmit={onSearch}>
            <div className="grid flex-1 gap-2">
              <label htmlFor="search" className="sr-only hidden" aria-hidden>
                search
              </label>
              <Input
                className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
                id="search"
                placeholder="Search events"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </form>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex justify-between items-center font-semibold text-[15px] text-muted-foreground">
            <h6 className="text-[15px] uppercase">pencarian terakhir</h6>
            <button
              className="text-sm capitalize hover:text-red-500 cursor-pointer"
              onClick={handlerDeleteAllHistory}
            >
              hapus
            </button>
          </div>
          <ol className="flex flex-col mt-4 gap-4 text-black/70">
            {historyList.length
              ? historyList.map((history: any) => {
                  return (
                    <li
                      className="flex gap-2 items-center hover:text-black transition cursor-pointer"
                      key={history.id}
                    >
                      <Link
                        href={history.url}
                        className="flex gap-2 items-center"
                      >
                        <History /> <p>{history.title}</p>
                      </Link>
                      <XIcon
                        className="ml-auto hover:text-red-500 cursor-pointer size-5"
                        onClick={() => handlerDeleteHistory(history.id)}
                      />
                    </li>
                  );
                })
              : ""}
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
