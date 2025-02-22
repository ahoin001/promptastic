"use client";

import GoogleButton from "@components/GoogleButton";
import {
  Card,
  Divider,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async () => {
    console.log("Submitting form", form.data);

    const { email, password } = data;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      console.log("Login Successful", result);
      router.push("/"); // Redirect to home page or any other page
    } catch (error) {
      console.error("Login Failed:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <div>
      <Card miw={700} shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="center" mt="md" mb="xs">
          <Text size={"xl"} fw={500}>
            Login
          </Text>
        </Group>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Password"
              placeholder="Password"
              type="password"
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group justify="center" mt="xl">
            <Button type="submit" disabled={!form.isValid()}>
              Submit
            </Button>
          </Group>
        </form>

        <Divider my="md" label="or" labelPosition="center" />

        <Group justify="center">
          <div onClick={() => signIn("google")}>
            <GoogleButton />
          </div>
        </Group>

        <Group justify="center" mt={28}>
          <Link
            href="/register"
            className="hover:underline hover:cursor-pointer"
          >
            Don't have an account? Sign up!
          </Link>
        </Group>
      </Card>
    </div>
  );
};

export default LoginPage;
