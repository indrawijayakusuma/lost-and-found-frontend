import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { FaWhatsapp } from "react-icons/fa";
import { ValidationDialog } from "./validationDialog";
import { postCompleteValidation } from "@/api/validation";
import { showSuccessMessage } from "@/utils/sweetAlert";

interface Posts {
  post_id: string;
  item_name: string;
  location: string;
  address: string;
  status_validation?: string;
  image: string;
  phone: string;
  validation_id: string;
}

interface Props {
  posts: Posts;
  typePost: string;
  setLoading: (loading: boolean) => void;
}

export const ItemCardDashboard = ({ posts, typePost, setLoading }: Props) => {
  const handlerComplateValidation = async () => {
    try {
      await postCompleteValidation(posts.validation_id);
      showSuccessMessage("Pemilik barang telah ditemukan");
      setLoading(true);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <div className="flex flex-row shadow-custom border-border/40 border pt-3 px-6 pb-5 rounded-lg">
      <div className="flex flex-col space-y-6 w-[60%]">
        <div className="flex flex-row gap-9">
          {typePost === "Ditemukan" && <p>Barang Ditemukan</p>}
          {typePost === "Diklaim" && <p>Barang Diklaim</p>}
          <p className="text-muteText">27 april 2024</p>
          {typePost !== "Daftar-postingan" && (
            <div
              className={`border border-border  px-4 py-[0.2rem] rounded-lg ${
                posts.status_validation === "Selesai"
                  ? "border-green-500 text-green-500 bg-green-500/5"
                  : ""
              } ${
                posts.status_validation === "Ditolak"
                  ? "border-red-500 text-red-500 bg-red-500/5"
                  : ""
              }`}
            >
              {posts.status_validation}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-7">
          <img
            src={posts.image}
            alt=""
            className="w-28 h-28 object-contain bg-slate-400 bg-contain bg-center"
          />
          <div className="item-center flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <HiOutlineShoppingBag className="text-primary w-5 h-5" />
              <p>{posts.item_name}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <GrLocation className="text-primary w-5 h-5" />
              {posts.address}, {posts.location}
            </div>
            <p></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between text-end w-[40%] h-44">
        <p className="mt-1 text-muted-foreground">
          {posts.status_validation === "Diproses" && typePost === "Ditemukan"
            ? "Menunggu Pemilik"
            : ""}
          {posts.status_validation === "Diproses" && typePost === "Diklaim"
            ? "Menunggu Validasi"
            : ""}
        </p>
        <div className="flex flex-row justify-end gap-3 items-center">
          <Link to="">Lihat Detail Barang</Link>
          {posts.status_validation === "Diproses" &&
            typePost === "Ditemukan" && (
              <ValidationDialog
                validationId={posts.validation_id}
                setLoading={setLoading}
              >
                validasi
              </ValidationDialog>
            )}
          {posts.status_validation === "Tervalidasi" &&
            typePost === "Ditemukan" && (
              <Button onClick={() => handlerComplateValidation()}>
                Selesai
              </Button>
            )}
          {posts.status_validation === "Tervalidasi" &&
            typePost === "Diklaim" && (
              <Link
                to={`https://wa.me/62${posts.phone}?text=Halo`}
                target="_blank"
                className="bg-green-500 hover:bg-green-500/85 flex gap-1 items-center px-4 py-2 text-primary-foreground rounded-md"
              >
                <FaWhatsapp className="w-4 h-4" />
                Whatsapp
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};
