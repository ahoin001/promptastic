"use client";

import { Card, Text, TextInput, Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "@node_modules/next/link";

const SignUpForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (data) => {
    console.log("Submitting form", data);

    const { email, password } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      //   toast({ title: "Registration Successful" });
    } catch (error) {
      console.error("Registration Failed:", error);
      //   toast({ title: "Registration Failed", description: error.message });
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
      </Card>
    </div>
  );
};

export default SignUpForm;
