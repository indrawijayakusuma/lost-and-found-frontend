/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { NavigationLayout } from "@/components/layout/navigationLayout";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { ItemList } from "@/components/fragments/itemList";
import { useState } from "react";

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
    <NavigationLayout>
      <div className="flex py-10 mb-16 justify-center gap-5">
        <div>
          <p className="font-medium ml-2">Filter</p>
          <div className="flex flex-col gap-4 w-40 shadow-custom border-border/40 border rounded-md py-3 px-4 text-sm ">
            <p className="font-medium">Lokasi</p>
            {kota.map((kota) => (
              <div key={kota} className="items-top flex space-x-2">
                <Checkbox id="terms1" className="rounded-md" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {kota}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[70%]">
          <Input
            className="rounded-lg w-[60%] flex mx-auto mb-3"
            placeholder="Cari postingan disini"
            onChange={(e) => debounced(e.target.value)}
          />
          <p className="text-sm text-muted-foreground ml-2 mb-3">
            Menampilkan {foundItem.numTotal} barang{" "}
            {search && `untuk "${search}"`} total page {foundItem.totalPage}
          </p>

          <ItemList
            setFoundItem={setFoundItem}
            search={search}
            page={page}
            limit={limit}
            foundItem={foundItem}
          />

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
                        page === foundItem?.totalPage
                          ? "cursor-not-allowed"
                          : ""
                      }
                    />
                  </Link>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};
