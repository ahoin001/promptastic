"use client";

import GoogleButton from "@components/GoogleButton";
import Link from "@node_modules/next/link";

import {
  Card,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  Divider,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useAuth } from "@hooks/useAuth";
import { useForm } from "@mantine/form";

const LoginForm = () => {
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value?.length < 2 ? "Name must have at least 2 letters" : null,
      username: (value) =>
        value?.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const handleSubmit = async (data) => {
    const { email, password } = data;

    try {
      login(email, password);
    } catch (error) {
      console.error("Login Failed:", error);
      notifications.show({
        title: "Error",
        message: "Login Failed!",
        color: "red",
      });
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group justify="center" mt="xl">
            <Button
              type="submit"
              disabled={!form.isValid()}
              radius="xl"
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 90 }}
            >
              Login
            </Button>
          </Group>
        </form>
        <Group justify="center" mt={28}>
          <Link href="/login" className="hover:underline hover:cursor-pointer">
            <Text>Already have an account? Login</Text>
          </Link>
        </Group>

        <Divider my="md" label="or" labelPosition="center" />

        <Group justify="center">
          <div onClick={() => signIn("google")}>
            <GoogleButton />
          </div>
        </Group>
      </Card>
    </div>
  );
};

export default LoginForm;
