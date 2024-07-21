import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { TbWorldSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

interface ItemCardProps {
  itemName: string;
  location: string;
  typeItem: string;
  postId: string;
}

export const ItemCard = ({
  itemName,
  location,
  typeItem,
  postId,
}: ItemCardProps) => {
  return (
    <div className="flex flex-col relative gap-1 md:w-80 max-h-36 shadow-custom border-border/40 border rounded-md py-3 px-4 text-sm">
      <div className="flex gap-2 items-center">
        <HiOutlineShoppingBag className="text-primary" />
        <p className="text-ellipsis w-64 whitespace-nowrap overflow-hidden h-full">
          {itemName}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GrLocation className="text-primary" />
        <p className="text-ellipsis w-64 whitespace-nowrap overflow-hidden h-full">
          {location}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <TbWorldSearch className="text-primary" />
        <p>{typeItem}</p>
      </div>
      <Link
        className="h-full items-end flex justify-end"
        to={`/daftar-barang-ditemukan/${postId}`}
      >
        <div className="flex justify-end items-end text-[0.9rem] font-medium">
          <p>Lihat Detail Barang</p>
        </div>
      </Link>
    </div>
  );
};
