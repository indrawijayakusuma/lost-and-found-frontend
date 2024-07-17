/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboardLayout";
import { ItemListDashboard } from "@/components/fragments/itemListDashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface postsInterface {
  post_id: string;
  item_name: string;
  location: string;
  address: string;
  status_validation?: string;
  image: string;
  phone: string;
  validation_id: string;
}

type statusType = "Diproses" | "Selesai" | "Ditolak" | "Semua" | "Tervalidasi";
type typePost = "Ditemukan" | "Diklaim" | "Daftar-postingan";

const statusTypes: statusType[] = [
  "Semua",
  "Diproses",
  "Tervalidasi",
  "Ditolak",
  "Selesai",
];

export const Dashboard = () => {
  const user = useLogin();
  const [posts, setPosts] = useState<postsInterface[]>([]);
  const [status, setStatus] = useState<statusType>("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [typePost, setTypePost] = useState<typePost>("Ditemukan");
  //   fetchData();
  // }, [typePost, loading]);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     if (typePost === "Ditemukan") {
  //       await getValidation();
  //     }
  //     if (typePost === "Diklaim") {
  //       await getMyclaimValidation();
  //     }
  //     if (typePost === "Daftar-postingan") {
  //       await getPostByuserIdApi();
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch data", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getMyclaimValidation = async () => {
  //   try {
  //     const response = (await getMyClaim()).data;
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch user", error);
  //   }
  // };
  // const getPostByuserIdApi = async () => {
  //   try {
  //     const response = (await getPostByuserId()).data;
  //     setPosts(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Failed to fetch user", error);
  //   }
  // };

  // const getValidation = async () => {
  //   try {
  //     const response = (await getClaimValidationByUserId()).data;
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch user", error);
  //   }
  // };

  const changeStatusHandler = (typeStatus: statusType) => {
    setStatus(typeStatus);
  };

  const typePostHandler = (type: typePost) => {
    setTypePost(type);
  };

  return (
    <DashboardLayout
      user={user}
      typePostHandler={typePostHandler}
      typePost={typePost}
    >
      <div className="flex flex-col gap-4 border-border/40 border rounded-lg p-5 md:w-[90%] w-full">
        <Input
          className="rounded-lg md:w-2/3 w-full"
          placeholder="Cari postinganmu disini"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {typePost !== "Daftar-postingan" && (
          <div className="hidden md:flex flex-row gap-4 rounded-lg items-center text-muted-foreground transition-colors">
            <p>Status</p>
            {statusTypes.map((statusType, index) => (
              <Button
                key={index}
                onClick={() => changeStatusHandler(statusType)}
                variant={"outline"}
                className={`px-6 ${
                  status === statusType ? "text-primary border-ring" : ""
                }`}
              >
                {statusType}
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-row">
          <div className="flex md:hidden min-w-[50%]">
            <Select onValueChange={(value: typePost) => typePostHandler(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={"Barang " + typePost} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ditemukan">Barang Ditemukan</SelectItem>
                <SelectItem value="Diklaim">Barang Diklaim</SelectItem>
                <SelectItem value="Daftar-postingan">List postingan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex md:hidden min-w-[50%]">
            {typePost !== "Daftar-postingan" && (
              <Select
                onValueChange={(value: statusType) =>
                  changeStatusHandler(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((statusType, index) => (
                    <SelectItem key={index} value={statusType}>
                      {statusType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ItemListDashboard
            setPosts={setPosts}
            posts={posts}
            typePost={typePost}
            searchTerm={searchTerm}
            status={status}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
