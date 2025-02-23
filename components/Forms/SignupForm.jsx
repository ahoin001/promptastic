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
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (data) => {
    const { email, username, password } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.ok) {
        const { message } = await response.json();
        notifications.show({
          title: "Success",
          message,
        });
      }

      login(email, password);
      router.push("/");
    } catch (error) {
      console.error("Registration Failed:", error);
      notifications.show({
        title: "Error",
        message: "Registration Failed!",
        color: "red",
      });
    }
  };

  return (
    <div>
      <Card miw={700} shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="center" mt="md" mb="xs">
          <Text size={"xl"} fw={500}>
            Sign Up
          </Text>
        </Group>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              mt="md"
              label="Username"
              placeholder="Username for account"
              {...form.getInputProps("username")}
            />

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
            <Button type="submit" disabled={!form.isValid()}>
              Submit
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
            <GoogleButton label="Signup with Google" />
          </div>
        </Group>
      </Card>
    </div>
  );
};

export default SignUpForm;
