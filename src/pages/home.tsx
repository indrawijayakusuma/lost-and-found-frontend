import { Input } from "@/components/ui/input";
import homeImg from "../assets/homepage.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Lost and Found Indonesia";
  }, []);

  return (
    <div>
      <div className="flex justify-center md:min-h-96 items-center relative">
        <img
          src={homeImg}
          alt="homepage"
          className="lg:w-full lg:h-auto h-64 object-cover"
        ></img>
        <div className="flex absolute md:bottom-28 bottom-16">
          <Input
            className="bg-white rounded-r-none active:border border-none w-60 lg:w-72"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => {
              navigate(`/daftar-barang-ditemukan?search=${search}`);
            }}
            variant="default"
            className="rounded-l-none"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center md:px-10 md:py-20 py-12">
        <div className="flex flex-col md:w-[70%] w-[85%]">
          <h3 className="text-2xl font-semibold mb-4">
            Lost and Found Indonesia
          </h3>
          <h5 className="md:text-base text-sm text-justify mb-3">
            Lost and Found Indonesia merupakan layanan penemuan barang yang
            mengandalkan laporan dan postingan. Pengguna dapat melihat,
            melaporkan, menjelaskan, serta mengkategorikan barang hilang atau
            ditemukan secara efisien dan efektif dengan menggunakan layanan Lost
            and Found Indonesia ini.
          </h5>
          <h5 className="md:text-base text-sm text-justify">
            Pengguna memiliki opsi untuk menambahkan lokasi, mengunggah foto,
            dan memberikan rincian tambahan. Aplikasi ini dapat mengirimkan
            notifikasi email kepada pengguna mengenai barang yang sesuai yang
            hilang atau ditemukan.
          </h5>
        </div>
      </div>
      <div className="flex flex-col justify-center md:py-20 py-12 bg-primary gap-3 items-center px-10">
        <div className="flex flex-col text-white text-center mb-auto">
          <h1 className="lg:text-3xl text-2xl font-semibold">
            "Lost? Found! Your Solution."
          </h1>
        </div>
        <div className="flex flex-col text-white text-center mt-auto ">
          <h5 className="text-base font-semibold">
            "Tak Hilang, Selalu Temukan: Layanan Lost and Found Terpercaya!"
          </h5>
        </div>
      </div>
    </div>
  );
};
