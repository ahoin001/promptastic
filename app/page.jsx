import Feed from "@components/Feed";
import { Text } from "@mantine/core";
import { Suspense } from "react";

export const Home = () => {
  return (
    <section className="w-full">
      <div className="text-center">
        <h1 className="head_text">
          Discover & Share
          <br className="max-md:hidden " />
          <span className="orange_gradient text-center">
            AI Powered Prompts
          </span>
        </h1>
      </div>

      <Text mt={16} size="xl" c="dimmed" ta="center">
        Promptastic is an open source AI pompting tool for modern world to
        discover, create and share creative prompts
      </Text>

      <div className="mt-10">
        <Suspense>
          <Feed />
        </Suspense>
      </div>
    </section>
  );
};

export default Home;
