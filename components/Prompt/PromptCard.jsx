"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Image from "next/image";

import { Avatar, Badge } from "@mantine/core";

const PromptCard = ({ post, handleDelete, handleEdit, handleTagClick }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [copiedPrompt, setCopiedPrompt] = useState("");

  const handleCopy = () => {
    setCopiedPrompt(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopiedPrompt("");
    }, 3000);
  };

  const iconUrl =
    copiedPrompt === post.prompt
      ? "/assets/icons/tick.svg"
      : "/assets/icons/copy.svg";

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Avatar
            src={post.author.image}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.author.username}
            </h3>
            <p className="text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>

        <div
          className={`copy_btn ${
            copiedPrompt === post.prompt ? "" : "cursor-pointer"
          }`}
          onClick={handleCopy}
        >
          <Image src={iconUrl} alt="copy icon" width={16} height={16} />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      {/* TODO make tag click return filtered tag list */}
      <Badge
        color="yellow"
        size="lg"
        radius="md"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </Badge>

      {session?.user.id === post.author._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-end gap-4 border-t border-gray-200 pt-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post._id)} // Call handleEdit function
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post._id)} // Call handleDelete function
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
