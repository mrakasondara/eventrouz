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

  const currentStatus = searchParams.get("status")?.toString() ?? "";

  useEffect(() => {
    setSearchTerm(searchParams.get("search")?.toString() ?? "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const handleFilter = (term: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("status", term.toLowerCase());
    } else {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="flex flex-col gap-8 mt-10 w-full">
      <form className="flex gap-5 w-full">
        <InputGroup className="w-3/4 md:w-1/2">
          <InputGroupInput
            placeholder="Cari berdasarkan nama event..."
            className="font-grotesk"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Cari</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Select value={currentStatus} onValueChange={handleFilter}>
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
