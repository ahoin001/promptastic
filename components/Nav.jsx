"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { Avatar, Button } from "@mantine/core";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

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

      {/* Mobile Nav */}
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

            <Link href="/profile">
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

      {/* Mobile Nav */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create_prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                  className="w-full mt-5 black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
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
