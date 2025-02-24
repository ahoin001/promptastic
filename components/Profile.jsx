import { useSession } from "next-auth/react";
import UserFeed from "./user/UserFeed";
import { Skeleton } from "@mantine/core";

const Profile = ({ description, profileId, user }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === profileId;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {user?.username ? (
          isOwner ? (
            "My Profile"
          ) : (
            `${user?.username}'s Profile`
          )
        ) : (
          <Skeleton height={60} mt={6} width="100%" radius="xl" />
        )}
      </h1>
      <p className="desc text-left">{isOwner ? description : ""}</p>
      <div className="mt-10">
        <UserFeed userId={profileId} />
      </div>
    </section>
  );
};

export default Profile;
