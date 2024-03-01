import { SessionType } from "@/app/type/types";
import ProfileContent from "@/components/profiile/ProfileContent";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function page() {
  const session: SessionType | null = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <>
      <head>
        <title>ErePain || Profile</title>
      </head>
      <ProfileContent token={token as string} />
    </>
  );
}
