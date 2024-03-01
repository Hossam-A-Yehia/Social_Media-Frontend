import { SessionType } from "@/app/type/types";
import FriendsPage from "@/components/profiile/FriendsPage";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

async function page() {
  const session: SessionType | null = await getServerSession(authOptions);

  const token = session?.user?.token;

  return (
    <>
      <head>
        <title>ErePain || Friends</title>
      </head>
      <FriendsPage token={token as string} />
    </>
  );
}
export default page;
