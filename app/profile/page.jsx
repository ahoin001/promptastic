"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { notifications } from "@mantine/notifications";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    data: posts = [],
    error,
    isPending,
    status,
    refetch,
  } = useQuery({
    queryKey: ["userPosts", session?.user.id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (!response.ok) throw new Error("Problem fetching posts");
      return response.json();
    },
    enabled: !!session?.user.id, // Only fetch if the user is available
  });

  const handleDelete = async (postId) => {
    if (postId) {
      try {
        setLoading(true);

        const response = await fetch(`/api/prompt/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();

        if (response.ok) {
          notifications.show({
            title: "Success",
            message: res.message,
          });
          refetch();
        }
      } catch (error) {
        console.log(error);
        notifications.show({
          title: "Error",
          message: "Problem deleting post",
          color: "teal",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (postId) => {
    router.push(`update-prompt?id=${postId}`);
  };

  return (
    <Profile
      description="Welcome to your personalized profile page"
      fetchingUserPosts={isPending}
      deletingPost={loading}
      name="My"
      posts={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
