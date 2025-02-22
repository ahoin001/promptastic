import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignUpForm from "@components/Forms/SignupForm";

const Register = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
};

export default Register;
