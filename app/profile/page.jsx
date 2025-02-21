"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { notifications } from "@mantine/notifications";

import Profile from "@components/Profile";
import { useUserPosts } from "@hooks/useUserPosts";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    data: posts = [],
    isPending,
    refetch,
  } = useUserPosts(session?.user?.id);

  const handleDelete = useCallback(
    async (postId) => {
      if (!postId) return;

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
        } else {
          throw new Error(res.message || "Problem deleting post");
        }
      } catch (error) {
        console.error(error);
        notifications.show({
          title: "Error",
          message: error.message || "Problem deleting post",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    },
    [refetch]
  );

  const handleEdit = useCallback(
    (postId) => {
      router.push(`update-prompt?id=${postId}`);
    },
    [router]
  );

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
