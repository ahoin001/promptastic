import React from "react";

import Feed from "@components/Feed";
import { Text } from "@mantine/core";

export const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center">
        Discover & Share
        <br className="max-md:hidden " />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>

      <Text mt={16} size="xl" c="dimmed" class="max-w-xl" ta="center">
        Promptastic is an open source AI pompting tool for modern world to
        discover, create and share creative prompts
      </Text>

      <Feed />
    </section>
  );
};

export default Home;
