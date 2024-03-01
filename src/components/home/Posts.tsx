"use client";
import CardPost from "./CardPost";
import DeployBox from "./DeployBox";
import { fetchPosts } from "@/app/actions/action";
import { PostsType, UserInfoType } from "@/app/type/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import NoPosts from "./NoPosts";

export default function Posts({
  token,
  userInfo,
}: {
  token: string;
  userInfo: UserInfoType;
}) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(token),
  });

  console.log(posts);

  return (
    <div className="flex items-center flex-col gap-4 w-full lg:w-1/2  h-full  p-2">
      <DeployBox token={token} userInfo={userInfo} />
      <>
        {isLoading ? (
          <Image
            src="/Ellipsis-1s-200px.gif"
            height={100}
            width={100}
            alt="dd"
          />
        ) : (
          <>
            {posts?.map((post: PostsType) => (
              <CardPost post={post} key={post._id} />
            ))}
            {posts?.length <= 0 && <NoPosts />}
          </>
        )}
      </>
    </div>
  );
}
