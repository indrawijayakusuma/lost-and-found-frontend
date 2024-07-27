/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  getClaimValidationByUserId,
  getMyClaim,
  getPostByuserId,
} from "@/api/posts";
import { ItemCardDashboard } from "./itemCardDashboard";

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

interface Props {
  setPosts: (arg: any) => void;
  posts: postsInterface[];
  typePost: string;
  searchTerm: string;
  status: string;
}

export const ItemListDashboard = ({
  setPosts,
  posts,
  typePost,
  searchTerm,
  status,
}: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [typePost]);

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

  const filteredItem = posts.filter(
    (post) =>
      (status === "Semua" || post.status_validation === status) &&
      post.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredItem.map((post, index) => (
        <ItemCardDashboard
          key={index}
          posts={post}
          setLoading={setLoading}
          typePost={typePost}
        />
      ))}
      {filteredItem.length === 0 && (
        <p className="text-center mt-8">Postingan tidak tersedia</p>
      )}
    </>
  );
};
