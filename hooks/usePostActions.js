// CRUD
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export const usePostActions = (refetch) => {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCopy = (post) => {
    setCopiedPrompt(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopiedPrompt("");
    }, 3000);
  };

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
          //   refetch();
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
      router.push(`/update-prompt?id=${postId}`);
    },
    [router]
  );

  return {
    copiedPrompt,
    loading,
    handleCopy,
    handleDelete,
    handleEdit,
  };
};
