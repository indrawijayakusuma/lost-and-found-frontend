import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GrLocation } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByid } from "@/api/posts";
import { NavigationLayout } from "@/components/layout/navigationLayout";
import { showFormattedDate } from "@/utils/dataFormater";

interface item {
  post_id: string;
  item_name: string;
  location: string;
  address: string;
  additional_info: string;
  date: string;
  image: string;
  fullname: string;
  picture: string;
  user_id: string;
  postNumber: number;
}

export const DetailItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState<item>({
    post_id: "",
    item_name: "",
    location: "",
    address: "",
    additional_info: "",
    date: "",
    image: "",
    fullname: "",
    picture: "",
    user_id: "",
    postNumber: 0,
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getPostByid(id || "");
        setItem(res.data.data);
      } catch (error) {
        console.log("error");
      }
    };
    getPost();
  }, [id]);

  return (
    <NavigationLayout>
      <div className="flex justify-center gap-4 mt-20 mb-40">
        <div className="flex h-80 space-x-12 w-[80%] justify-center">
          <div className="">
            <img
              src={item.image}
              alt=""
              className="w-60 h-60 object-contain bg-slate-400 bg-contain bg-center rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2 w-1/3 text-base">
            <p className="text-lg font-semibold md:text-2xl">
              {item.item_name}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row item-center gap-2 items-center">
                <GrLocation className="text-muted-foreground mt-1 w-4 h-4" />
                <p>
                  {item.address}, {item.location}
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <IoMdTime className="text-muted-foreground mt-1 w-4 h-4" />
                <p>{showFormattedDate(item.date)}</p>
              </div>
              <div className="gap-1 flex flex-col">
                <Separator className="mt-3" />
                <span className="text-primary py-1.5">Informasi Tambahan</span>
                <div className="flex flex-col">
                  <Separator className="w-36 bg-primary" />
                  <Separator className="" />
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                {item.additional_info}
              </p>
            </div>
            <Separator className="mt-14 mb-4" />
            <div className="flex flex-row space-x-5">
              <Avatar className="h-16 w-16">
                <AvatarImage src={item.picture} />
                <AvatarFallback className="font-semibold text-3xl">
                  {item.fullname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <p className="text-lg font-semibold md:text-2xl">
                  {item.fullname}
                </p>
                <p className="text-muted-foreground">
                  {item.postNumber} Barang ditemukan
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-64 border justify-evenly border-opacity-90 shadow-sm rounded-lg py-3 px-5 item-center">
            <p className="text-lg font-semibold md:text-md text-center">
              Catatan Saat klaim
            </p>
            <Separator className="" />
            <p className="text-sm text-muted-foreground text-justify">
              Pastikan barang yang Anda klaim adalah barang milik Anda sendiri.
              Verifikasi secara teliti agar tidak terjadi kesalahan atau
              ketidakakuratan dalam proses klaim
            </p>
            <Button
              onClick={() => navigate(`/claim-form/${item.post_id}`)}
              className="bg-primary w-full"
            >
              klaim
            </Button>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};
