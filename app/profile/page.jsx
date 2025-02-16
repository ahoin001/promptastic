"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // TODO Replace with pretty modal
  const handleDelete = async (postId) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        setLoading(true);

        const res = await fetch(`/api/prompt/${postId}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((post) => post._id !== postId);

        setPosts(filteredPosts);

        // if (res.ok) {
        //   return new Response(
        //     { message: "Post deleted successfully" },
        //     { status: 200 }
        //   );
        // }
      } catch (error) {
        console.log(error);
        return new Response(
          { message: "Problem deleting post" },
          { status: 500 }
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (postId) => {
    router.push(`update-prompt?id=${postId}`);
  };

  useEffect(() => {
    const getUsersPosts = async () => {
      console.log(session?.user);
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      getUsersPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      posts={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
