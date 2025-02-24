"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const [loading, setLoading] = useState(false);
  const [promptId, setPromptId] = useState("");
  const [post, setPost] = useState({ prompt: "" });

  const router = useRouter();

  const [tags, setTags] = useState([]);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      setPromptId(searchParams.get("id"));
    }
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!promptId) {
      alert("Prompt id not found");
    }

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tags: tags,
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
      if (!promptId) return;
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      console.log("******: ", data);

      setPost({
        ...data,
      });

      setTags([...data.tags]);
    };

    if (promptId) {
      getPrompt();
    }
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      tags={tags}
      setPost={setPost}
      setTags={setTags}
      loading={loading}
      handleSubmit={editPost}
    />
  );
};

export default UpdatePrompt;
