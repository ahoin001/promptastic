"use client";

import { useParams } from "next/navigation";
import Profile from "@components/Profile";
import { useGetUser } from "@hooks/useGetUser";

const SomeProfile = () => {
  const { id: profileId } = useParams();

  const { data: user } = useGetUser(profileId);
  return (
    <Profile
      user={user}
      profileId={profileId}
      description="Welcome to your personalized profile page"
    />
  );
};

export default SomeProfile;
