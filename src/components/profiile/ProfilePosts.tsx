import { PostsType } from "@/app/type/types";
import CardPost from "../home/CardPost";

export default function ProfilePosts({
  userPosts,
}: {
  userPosts: PostsType[];
}) {
  return (
    <div className="flex-[2] w-full ">
      <div className="bg-white w-full rounded-lg py-3 px-4 text-base font-semibold dark:bg-secbg mb-3">
        Basic Infos
      </div>
      <div className=" flex flex-col gap-3">
        {userPosts?.length > 0
          ? userPosts?.map((post: PostsType) => <CardPost post={post} />)
          : ""}
      </div>
    </div>
  );
}
