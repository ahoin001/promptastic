import { useSession } from "next-auth/react";
import UserFeed from "./user/UserFeed";

const Profile = ({ description, profileId, user }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === profileId;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {isOwner ? "My" : `${user?.username}'s`} Profile
      </h1>
      <p className="desc text-left">{isOwner ? description : ""}</p>
      <div className="mt-10">
        <UserFeed userId={profileId} />
      </div>
    </section>
  );
};

export default Profile;
