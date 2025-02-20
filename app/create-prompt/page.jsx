"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { notifications } from "@mantine/notifications";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const [tags, setTags] = useState([]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tags: tags,
          user: session?.user.id ?? null,
        }),
      });
      const data = await res.json();
      console.log("createPrompt: ", data);

      if (res.ok) {
        setLoading(false);

        notifications.show({
          title: `Success`,
          message: `New prompt has been created.`,
          color: "teal",
        });

        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      tags={tags}
      setPost={setPost}
      setTags={setTags}
      loading={loading}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
