"use client";

import { useParams } from "next/navigation";
import Profile from "@components/Profile";

const SomeProfile = () => {
  const { id: profileId } = useParams();

  return (
    <Profile
      profileId={profileId}
      description="Welcome to your personalized profile page"
    />
  );
};

export default SomeProfile;
