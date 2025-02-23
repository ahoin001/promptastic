import Feed from "@components/Feed";
import { Stack, Text } from "@mantine/core";

export const Home = () => {
  return (
    <section className="w-full">
      <Stack justify="center" align="center">
        <h1 className="head_text text_center">
          Discover & Share
          <br className="max-md:hidden " />
          <span className="orange_gradient text-center">
            AI Powered Prompts
          </span>
        </h1>
      </Stack>

      <Text mt={16} size="xl" c="dimmed" ta="center">
        Promptastic is an open source AI pompting tool for modern world to
        discover, create and share creative prompts
      </Text>

      <div className="mt-10">
        <Feed />
      </div>
    </section>
  );
};

export default Home;
