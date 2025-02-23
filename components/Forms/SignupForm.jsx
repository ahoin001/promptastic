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

const SignUpForm = () => {
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      username: (value) =>
        value.length >= 3 ? null : "Username must be at least 3 characters",
      password: (value) =>
        value.length >= 3 ? null : "Password must be at least 3 characters",
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

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle multiple field errors from API
          form.setErrors(result.errors);
        } else {
          notifications.show({
            title: "Error",
            message: result.message || "Registration failed",
            color: "red",
          });
        }
        return;
      }

      if (response.ok) {
        const { message } = result;
        notifications.show({
          title: "Success",
          message,
        });
        login(email, password);
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      notifications.show({
        title: "Error",
        message: error.message,
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
              error={form.errors.username}
              withAsterisk
              {...form.getInputProps("username")}
            />

            <TextInput
              withAsterisk
              mt="md"
              label="Email"
              placeholder="Email"
              error={form.errors.email}
              {...form.getInputProps("email")}
            />

            <TextInput
              withAsterisk
              label="Password"
              placeholder="Password"
              error={form.errors.password}
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group justify="center" mt="xl">
            <Button
              type="submit"
              radius="xl"
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 90 }}
            >
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
            <GoogleButton />
          </div>
        </Group>
      </Card>
    </div>
  );
};

export default SignUpForm;
