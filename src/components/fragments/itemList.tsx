/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ItemCard } from "./itemCard";
import { getposts } from "@/api/posts";

interface Props {
  setFoundItem: (arg: any) => void;
  search: string;
  page: number;
  limit: number;
  foundItem: any;
  location: string | null;
}

export const ItemList = ({
  setFoundItem,
  search,
  page,
  limit,
  foundItem,
  location,
}: Props) => {
  useEffect(() => {
    const getpostsItem = async () => {
      try {
        const response = (await getposts({ search, page, limit, location }))
          .data;
        setFoundItem(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getpostsItem();
  }, [page, limit, search, location]);

  return (
    <>
      {foundItem.item.length >= 1 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full">
          {foundItem?.item?.map((item: any) => (
            <ItemCard
              key={item.postId}
              itemName={item.itemName}
              location={item.location}
              typeItem={item.tipeBarang}
              postId={item.postId}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center font-semibold mt-10">
          Postingan tidak tersedia
        </div>
      )}
    </>
  );
};
