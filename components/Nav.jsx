"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { Avatar, Button, Group, Menu } from "@mantine/core";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptastic"
          width={30}
          height={30}
          className="object-contain"
        />
        <h1 className="logo_text">Promptastic</h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt">
              <Button
                radius="xl"
                variant="gradient"
                gradient={{ from: "red", to: "orange", deg: 90 }}
              >
                Create Post
              </Button>
            </Link>

            <Button
              color="rgba(0, 0, 0, 1)"
              variant="outline"
              radius="xl"
              onClick={signOut}
            >
              Sign out
            </Button>

            <Link href={`profile/${session?.user.id}`}>
              <Avatar
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <Group>
              <Button
                component={Link}
                href={"/register"}
                color={"black"}
                variant="outline"
                radius={"lg"}
              >
                Register
              </Button>

              <Button
                component={Link}
                href={"/login"}
                color={"black"}
                radius={"lg"}
              >
                Login
              </Button>

              {/* {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <Button
                      radius={"lg"}
                      color={"black"}
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })} */}
            </Group>
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Image
                  src={session?.user.image}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt="profile"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  component={Link}
                  href="/profile"
                  className="dropdown_link"
                >
                  My Profile
                </Menu.Item>
                <Menu.Item component={Link} href="/create-prompt">
                  Create prompt
                </Menu.Item>
                <Menu.Item
                  component={Button}
                  color="black"
                  variant="outline"
                  onClick={signOut}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
