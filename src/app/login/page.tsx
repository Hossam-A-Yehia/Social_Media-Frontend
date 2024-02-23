import FormLogin from "@/components/login/FormLogin";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  console.log(session);

  return (
    <>
      <FormLogin />
    </>
  );
}
