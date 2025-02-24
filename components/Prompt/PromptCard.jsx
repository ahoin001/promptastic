"use client";

import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";

import Image from "next/image";

import { Avatar, Badge, Box, Button, Group, Modal, Text } from "@mantine/core";
import Link from "next/link";
import { usePostActions } from "@hooks/usePostActions";
import { useRouter } from "next/router";

const PromptCard = ({ post }) => {
  const { data: session } = useSession();

  const [opened, { open, close }] = useDisclosure(false);

  const isBeingViewedByOwner = post.user._id === session?.user?.id;

  const { copiedPrompt, handleCopy, handleDelete, handleEdit } =
    usePostActions();

  const onConfirmDelete = (postId) => {
    close();
    handleDelete(postId);
  };

  const iconUrl =
    copiedPrompt === post.prompt
      ? "/assets/icons/tick.svg"
      : "/assets/icons/copy.svg";

  const router = useRouter();
  const isProfileRoute = router.pathname.startsWith("/profile");

  return (
    <div className="prompt_card">
      <Link
        href={`/profile/${post.user._id}`}
        className="flex justify-between items-start gap-5"
      >
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          {/* TODO where do they get image from? */}
          {/* src={post.user.image} */}
          <Avatar
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.user.username}
            </h3>
            <p className="text-sm text-gray-500">{post.user.email}</p>
          </div>
        </div>

        <div
          className={`copy_btn ${
            copiedPrompt === post.prompt ? "" : "cursor-pointer"
          }`}
          onClick={() => handleCopy(post)}
        >
          <Image src={iconUrl} alt="copy icon" width={16} height={16} />
        </div>
      </Link>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      <Group>
        {/* TODO make tag click return filtered tag list */}
        {post.tags.map((tag) => {
          return (
            <Badge key={tag._id} color="yellow" size="lg" radius="md">
              #{tag.name}
            </Badge>
          );
        })}
      </Group>

      {/* Make sure users can't crud other users stuff */}
      {isBeingViewedByOwner && isProfileRoute && (
        <div className="mt-5 flex justify-end gap-4 border-t border-gray-200 pt-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post._id)} // Call handleEdit function
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={open}
          >
            Delete
          </p>
        </div>
      )}

      <Modal
        opened={opened}
        onClose={close}
        centered
        size="lg"
        title="Are you sure?"
        padding="xl"
        transition="fade"
      >
        <Box style={{ textAlign: "center" }}>
          <Text className="font-inter">
            You are about to delete one of your prompts.
          </Text>
          <Text className="font-inter" style={{ marginBottom: "20px" }}>
            This action cannot be undone.
          </Text>

          <Group justify="flex-end" gap="lg" mt={50}>
            <Button onClick={close} size="md" color="blue" radius="md">
              Close Modal
            </Button>

            <Button
              variant="outline"
              size="md"
              color="red"
              radius="md"
              onClick={() => onConfirmDelete(post._id)}
            >
              Delete prompt
            </Button>
          </Group>
        </Box>
      </Modal>
    </div>
  );
};

export default PromptCard;
