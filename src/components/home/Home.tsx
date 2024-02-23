"use client";
import NewJob from "@/components/home/NewJob";
import FriendsRequest from "@/components/home/FriendsRequest";
import Stories from "@/components/home/Stories";
import SuggestedFrients from "@/components/home/SuggestedFrients";
import TheWeather from "@/components/home/TheWeather";
import Posts from "@/components/home/Posts";
import FriendsList from "@/components/home/FriendsList";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo } from "@/app/actions/action";

export default function HomeComponents({ token }: { token: string }) {
  const { data }: any = useSession();
  const userId = String(data?.user?.user?._id);
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(token, userId),
  });

  return (
    <div className=" py-4 container mx-auto h-full flex  bg-slate-100  dark:bg-mainbg">
      {/* LEFT */}
      <div className="hidden items-center flex-col gap-4 w-1/4 h-full px-4 lg:flex">
        <FriendsList userInfo={userInfo} />
        <Stories />
        <TheWeather />
      </div>
      {/* CENTER */}
      <Posts token={token} />
      {/* RIGHT */}
      <div className="flex items-center flex-col gap-4 w-1/4 h-full px-4 sticky left-0 bottom-[16px]">
        <SuggestedFrients token={token} />
        <FriendsRequest token={token} />

        <NewJob />
      </div>
    </div>
  );
}
