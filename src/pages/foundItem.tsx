/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { ItemList } from "@/components/fragments/itemList";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const kota = [
  "Jakarta Barat",
  "Jakarta Pusat",
  "Jakarta Timur",
  "Jakarta Selatan",
  "Jakarta Utara",
];

interface foundItemInterface {
  item: Array<any>;
  numTotal: number;
  startIndex: number;
  endIndex: number;
  totalPage: number;
}

export const FoundItem = () => {
  const [foundItem, setFoundItem] = useState<foundItemInterface>({
    item: [],
    numTotal: 0,
    startIndex: 0,
    endIndex: 0,
    totalPage: 0,
  });
  const [limit] = useState(12);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  const debounced = useDebouncedCallback((value) => {
    setSearchParams({ search: value });
    setSearch(value);
  }, 300);

  if (loading) {
    return (
      <p className="flex min-h-screen items-center justify-center">
        loading...
      </p>
    );
  }

  return (
    <div className="flex md:flex-row flex-col md:py-10 py-4 min-h-screen justify-center gap-5 px-4 md:px-0">
      <div>
        <p className="font-medium ml-2 hidden md:flex">Filter</p>
        <div className="md:flex flex-col hidden gap-4 w-40 shadow-custom border-border/40 border rounded-md py-3 px-4 text-sm ">
          <p className="font-medium">Lokasi</p>
          <RadioGroup
            onValueChange={(value) => setCity(value)}
            className="grid gap-4"
          >
            {kota.map((kota) => (
              <div key={kota} className="flex items-center space-x-2">
                <RadioGroupItem value={kota} id={kota} />
                <Label
                  htmlFor="option-one"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {kota}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col gap-3 min-w-[70%] min-h-screen">
        <Input
          className="rounded-lg md:w-[60%] w-[90%] flex mx-auto mb-3"
          placeholder="Cari postingan disini"
          onChange={(e) => debounced(e.target.value)}
        />

        <p className="font-medium ml-2 md:hidden flex">Filter</p>
        <div className="flex md:hidden">
          <Select onValueChange={(value) => setCity(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lokasi" />
            </SelectTrigger>
            <SelectContent>
              {kota.map((kota) => (
                <SelectItem key={kota} value={kota}>
                  {kota}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground ml-2 mb-3">
          Menampilkan {foundItem.numTotal} barang{" "}
          {search && `untuk "${search}"`} total page {foundItem.totalPage}
        </p>

        <div className="min-h-80">
          <ItemList
            setFoundItem={setFoundItem}
            search={search}
            page={page}
            limit={limit}
            foundItem={foundItem}
            location={city}
          />
        </div>

        {foundItem.totalPage > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Link to={page === 1 ? "#" : `?page=${page - 1}`}>
                  <PaginationPrevious
                    href="#"
                    className={page === 1 ? "cursor-not-allowed" : ""}
                  />
                </Link>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Link
                  to={
                    page === foundItem?.totalPage
                      ? `?page=${page}`
                      : `?page=${page + 1}`
                  }
                >
                  <PaginationNext
                    href="#"
                    className={
                      page === foundItem?.totalPage ? "cursor-not-allowed" : ""
                    }
                  />
                </Link>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};
