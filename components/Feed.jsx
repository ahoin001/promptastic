"use client";

import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id} // Ensure that post._id is unique
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearchChange = (e) => {};

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt/all");
      const data = await response.json();

      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or user name"
          value={searchText}
          onChange={onSearchChange}
          required
          className="seaerch_input peer"
        />
      </form>

      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
