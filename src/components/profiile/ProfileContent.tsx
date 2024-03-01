"use client";
import ProfileInfo from "@/components/profiile/ProfileInfo";
import ProfilePosts from "@/components/profiile/ProfilePosts";
import ProfileCover from "@/components/profiile/ProfileCover";
import {
  fetchUserInfo,
  fetchUserPost,
  viewProfile,
} from "@/app/actions/action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProfileContent({ token }: { token: string }) {
  const { data }: any = useSession();
  const params = useParams();
  const userId: string = String(params.profileId);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(token, userId),
  });
  const { data: userPosts } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => fetchUserPost(token, userId),
  });

  const queryClient = useQueryClient();

  const viewProfileMutations = useMutation({
    mutationFn: ({ token, userId }: { token: string; userId: string }) =>
      viewProfile({ token, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  useEffect(() => {
    if (!userInfo?.views?.includes(data?.user?.user?._id)) {
      viewProfileMutations.mutate({ token, userId });
    }
  }, []);
  return (
    <div className=" px-[20px] lg:px-[125px]  w-full bg-slate-100 py-[20px]  dark:bg-mainbg ">
      <ProfileCover userInfo={userInfo} />
      <div className="flex flex-col mt-4">
        <h2 className="font-bold text-2xl">{userInfo?.friends?.length}</h2>
        <span className="text-xs text-gray-400">FRIENDS</span>
      </div>
      <div className="flex gap-3 items-start mt-4 flex-col md:flex-row">
        <ProfileInfo userInfo={userInfo} userPosts={userPosts} />
        <ProfilePosts userPosts={userPosts} />
      </div>
    </div>
  );
}
