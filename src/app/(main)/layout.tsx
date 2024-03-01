import Nav from "@/components/home/Nav";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { SessionType } from "../type/types";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: SessionType | null = await getServerSession(authOptions);
  const token: any = session?.user?.token;
  const userId: any = session?.user?.user?._id;

  return (
    <>
      <Nav token={token} userId={userId} />
      {children}
    </>
  );
}
