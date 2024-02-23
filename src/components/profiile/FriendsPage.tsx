"use client";
import { fetchUserInfo } from "@/app/actions/action";
import ProfileCover from "@/components/profiile/ProfileCover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { UserInfoType } from "@/app/type/types";

export default function FriendsPage({ token }: { token: string }) {
  const params = useParams();
  const userId: string = String(params.friendsId);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(token, userId),
  });

  return (
    <div className=" px-[20px] lg:px-[125px]  w-full bg-slate-100 py-[20px]  dark:bg-mainbg ">
      <ProfileCover userInfo={userInfo} />
      <div className=" dark:bg-secbg bg-white w-full mt-[50px] flex items-center justify-between rounded-lg p-3">
        <span className="text-sm dark:text-slate-300 text-slate-900 font-semibold">
          {userInfo?.friends?.length} friends
        </span>
        <form className="w-[300px] rounded-lg hidden md:block ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative rounded-lg">
            <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300  bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none placeholder:text-sm  placeholder:text-slate-400 rounded-lg"
              placeholder="Search..."
              required
            />
          </div>
        </form>
      </div>
      <div className="flex items-center mt-3 flex-wrap">
        {userInfo?.friends?.map((e: UserInfoType) => (
          <Link
            href={`/profile/${e._id}`}
            key={e._id}
            className=" w-full md:w-1/2  lg:w-1/4 p-2 text-center  "
          >
            <div className="flex flex-col gap-2 rounded-lg dark:bg-secbg bg-white py-5 items-center justify-center hover:bg-red-200 hover:translate-y-2 duration-300">
              <div className="flex flex-col">
                <Avatar className="size-[90px] overflow-visible   mx-auto  relative">
                  <AvatarImage className=" rounded-full " src={e.photo} />
                  <AvatarFallback>CN</AvatarFallback>

                  <input type="file" className="hidden" id="Avatar" />
                </Avatar>
                <h3 className="text-base font-bold mt-2">{e.name}</h3>
                <span className="text-gray-400 text-xs">{e.profession}</span>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex flex-col px-3">
                  <span className="text-[10px] text-gray-400 ">FRIENDS</span>
                  <span className="text-sm font-semibold">
                    {e.friends?.length}
                  </span>
                </div>
                <div className="flex flex-col px-3 border-x border-x-gray-400">
                  <span className="text-[10px] text-gray-400 ">POSTS</span>
                  <span className="text-sm font-semibold">12</span>
                </div>
                <div className="flex flex-col px-3">
                  <span className="text-[10px] text-gray-400 ">VIEWS</span>
                  <span className="text-sm font-semibold">
                    {e.views?.length}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
