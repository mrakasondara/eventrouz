"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export const EventFilterSection = ({
  resultLength,
}: {
  resultLength: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search")?.toString() ?? ""
  );

  const [status, setStatus] = useState<string | null>(
    searchParams.get("status")?.toString() ?? ""
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("search")?.toString() ?? "");
    setStatus(searchParams.get("status")?.toString() ?? "");
  }, [searchParams]);

  const onSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
    updateSearchandFilter({ search: searchTerm, status });
  };

  const updateSearchandFilter = (
    updates: Record<string, string | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toLowerCase());
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);

  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set("search", term);
  //   } else {
  //     params.delete("search");
  //   }

  //   replace(`${pathname}?${params.toString()}`, { scroll: false });
  // };

  // const handleFilter = (term: string | null) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set("status", term.toLowerCase());
  //   } else {
  //     params.delete("status");
  //   }

  //   replace(`${pathname}?${params.toString()}`, { scroll: false });
  // };

  return (
    <section className="flex flex-col gap-8 mt-10 w-full">
      <form className="flex gap-5 w-full" onSubmit={onSubmitHandler}>
        <InputGroup className="w-3/4 md:w-1/2">
          <InputGroupInput
            placeholder="Cari berdasarkan nama event..."
            className="font-grotesk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end" className="mx-2">
            <InputGroupButton
              className="border-2 border-black shadow-[2px_4px_2px_0px_#323232] cursor-pointer"
              type="submit"
            >
              Cari
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Select
          value={status ?? ""}
          onValueChange={(value) => setStatus(value || null)}
        >
          <SelectTrigger className="w-[250px] px-3">
            <SelectValue
              placeholder="Filter berdasarkan status"
              className="font-grotesk"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="font-grotesk py-2">
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Launch">Launch</SelectItem>
              <SelectItem value="End">End</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>

      {searchTerm && (
        <div className="flex flex-col gap-2 text-lg">
          <p>
            Hasil pencarian <span className="font-bold">{searchTerm}</span>
          </p>

          <p className="text-slate-400 text-sm">
            Terdapat {resultLength} hasil pencarian
          </p>
        </div>
      )}
    </section>
  );
};
