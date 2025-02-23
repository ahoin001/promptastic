import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignUpForm from "@components/Forms/SignupForm";

const Register = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
};

export default Register;
