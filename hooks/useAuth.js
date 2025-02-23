import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";

export function useAuth() {
  /**
   *
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      //   router.push("/");
      notifications.show({
        title: "Success",
        message: "Signed in successfully!",
        color: "teal",
      });
    } else {
      notifications.show({
        title: "Error",
        message: result?.error || "Login failed",
        color: "red",
      });
    }
  };

  return { login };
}
