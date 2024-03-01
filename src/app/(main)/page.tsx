import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { SessionType } from "../type/types";
import HomeComponents from "@/components/home/Home";

export default async function Home() {
  const session: SessionType | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }
  const token: string = session?.user?.token;
  const userId: string = session?.user?.user._id;

  return (
    <>
      <head>
        <title>ErePain || Home</title>
      </head>
      <HomeComponents token={token} userId={userId} />
    </>
  );
}
