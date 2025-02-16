"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!promptId) {
      alert("Prompt id not found");
    }

    try {
      console.log("edit");
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        setLoading(false);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPrompt();
    }
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      loading={loading}
      handleSubmit={editPost}
    />
  );
};

export default UpdatePrompt;
