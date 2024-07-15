/* eslint-disable react-hooks/exhaustive-deps */
import { ItemCardDashboard } from "@/components/fragments/itemCardDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useState } from "react";
import {
  getClaimValidationByUserId,
  getMyClaim,
  getPostByuserId,
} from "@/api/posts";
import { DashboardLayout } from "@/components/layout/dashboardLayout";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [typePost, loading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (typePost === "Ditemukan") {
        await getValidation();
      }
      if (typePost === "Diklaim") {
        await getMyclaimValidation();
      }
      if (typePost === "Daftar-postingan") {
        await getPostByuserIdApi();
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const getMyclaimValidation = async () => {
    try {
      const response = (await getMyClaim()).data;
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };
  const getPostByuserIdApi = async () => {
    try {
      const response = (await getPostByuserId()).data;
      setPosts(response.data);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const getValidation = async () => {
    try {
      const response = (await getClaimValidationByUserId()).data;
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const changeStatusHandler = (typeStatus: statusType) => {
    setStatus(typeStatus);
  };

  const typePostHandler = (type: typePost) => {
    setTypePost(type);
  };

  const filteredItem = posts.filter(
    (post) =>
      (status === "Semua" || post.status_validation === status) &&
      post.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <p className="flex min-h-screen items-center justify-center">
        loading...
      </p>
    );
  }

  return (
    <DashboardLayout
      user={user}
      typePostHandler={typePostHandler}
      typePost={typePost}
    >
      <div className="flex flex-col gap-5 border-border/40 border rounded-lg p-5 md:w-[90%] w-full">
        <Input
          className="rounded-lg w-2/3"
          placeholder="Cari postinganmu disini"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="hidden md:block">
          {typePost !== "Daftar-postingan" && (
            <div className="flex flex-row gap-4 rounded-lg items-center text-muted-foreground transition-colors">
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
        </div>
        <div className="flex flex-col gap-3">
          {filteredItem.map((post, index) => (
            <ItemCardDashboard
              key={index}
              posts={post}
              setLoading={setLoading}
              typePost={typePost}
            />
          ))}
          {filteredItem.length === 0 && (
            <p className="text-center mt-8">Item Tidak Tersedia</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
