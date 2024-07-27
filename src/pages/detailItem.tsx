import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowBack, IoMdTime } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByid } from "@/api/posts";
import { showFormattedDate } from "@/utils/dataFormater";
import { useLogin } from "@/hooks/useLogin";
import { checkValidationUser } from "@/api/validation";

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
  is_claimed: boolean;
}

export const DetailItem = () => {
  const user = useLogin();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUserClaimed, setIsUserClaimed] = useState(false);
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
    is_claimed: false,
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

    const checkUserValidation = async () => {
      try {
        const res = await checkValidationUser(item.post_id, user.user_id);
        setIsUserClaimed(res.data.result);
      } catch {
        console.log("error");
      }
    };

    getPost();
    checkUserValidation();
  }, [id, item.post_id, user.user_id]);

  return (
    <div className="flex flex-col justify-center md:mt-12 gap-4 mt-4 md:mb-72 mb-20">
      <button
        className="flex md:w-[80%] w-[90%] mx-auto"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="w-6 h-6" />
      </button>
      <div className="flex md:flex-row flex-col mx-auto md:h-80 md:space-x-12 md:w-[80%] w-[90%] md:gap-0 gap-4 md:items-start items-center justify-center">
        <div className="">
          <img
            src={item.image}
            alt=""
            className="md:w-60 md:h-60 w-96 h-96 object-contain bg-slate-400 bg-contain bg-center rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 md:w-1/3 w-full text-base">
          <p className="text-xl font-semibold md:text-2xl">{item.item_name}</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <GrLocation className="text-muted-foreground mt-1 w-4 h-4" />
              <p className="w-full">
                {item.address}, {item.location}
              </p>
            </div>
            <div className="flex flex-row gap-2">
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
            <p className="text-muted-foreground mt-2">{item.additional_info}</p>
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

        <div className="flex flex-col gap-4 md:w-64 w-full border md:mt-0 mt-7 justify-evenly border-opacity-90 shadow-sm rounded-lg md:py-3 py-5 px-5 item-center">
          <p className="text-lg font-semibold md:text-md text-center">
            {isUserClaimed && "Anda telah melakukan klaim pada barang ini"}
            {item.is_claimed && "Barang selesai di klaim"}
            {!item.is_claimed && !isUserClaimed && "Catatan saat klaim"}
          </p>

          <Separator className="" />
          {item.is_claimed === false && isUserClaimed === false && (
            <p className="text-sm text-muted-foreground text-justify">
              Pastikan barang yang Anda klaim adalah barang milik Anda sendiri.
              Verifikasi secara teliti agar tidak terjadi kesalahan atau
              ketidakakuratan dalam proses klaim
            </p>
          )}
          {user.user_id === item.user_id && item.is_claimed === false && (
            <Button
              onClick={() => navigate(`/edit-postingan/${item.post_id}`)}
              className="bg-primary w-full"
            >
              Edit Postingan
            </Button>
          )}
          {user.user_id !== item.user_id &&
            item.is_claimed === false &&
            isUserClaimed === false && (
              <Button
                onClick={() => navigate(`/claim-form/${item.post_id}`)}
                className="bg-primary w-full"
              >
                klaim
              </Button>
            )}
          {isUserClaimed && (
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-primary w-full"
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
