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
}

export const ItemList = ({
  setFoundItem,
  search,
  page,
  limit,
  foundItem,
}: Props) => {
  useEffect(() => {
    const getpostsItem = async () => {
      try {
        const response = (await getposts({ search, page, limit })).data;
        setFoundItem(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getpostsItem();
  }, [page, limit, search]);

  return (
    <>
      {foundItem.item.length >= 1 ? (
        <div className="grid grid-cols-3 gap-4 w-full">
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
