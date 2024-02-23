import { Eye } from "lucide-react";
import { MdSchool } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { MoreVertical, Heart } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfoType } from "@/app/type/types";

export default function ProfileInfo({
  userInfo,
  postsLength,
}: {
  userInfo: UserInfoType;
  postsLength: number;
}) {
  return (
    <div className="flex-1 w-full  ">
      <div className="bg-white w-full rounded-lg py-3 px-4 text-base font-semibold dark:bg-secbg">
        Basic Infos
      </div>
      <ul className="bg-white dark:bg-secbg w-full my-3 rounded-lg">
        <li className="flex items-center justify-between py-3 px-4 ">
          <div className="flex items-start flex-col gap-1">
            <span className=" text-sm font-semibold">Friends</span>
            <span className="text-gray-400 text-[13px]">
              {userInfo?.friends?.length} Friend
            </span>
          </div>
          <FaUserFriends size={23} color="gray" />
        </li>
        <hr />
        <li className="flex items-center justify-between py-3 px-4 ">
          <div className="flex items-start flex-col gap-1">
            <span className=" text-sm font-semibold">Views</span>
            <span className="text-gray-400 text-[13px]">
              {userInfo?.views?.length} Views
            </span>
          </div>
          <Eye size={23} color="gray" />
        </li>
        <hr />
        <li className="flex items-center justify-between py-3 px-4 ">
          <div className="flex items-start flex-col gap-1">
            <span className=" text-sm font-semibold">Posts</span>
            <span className="text-gray-400 text-[13px]">
              {postsLength} Post
            </span>
          </div>
          <FaPhotoFilm size={23} color="gray" />
        </li>
        <hr />
        <li className="flex items-center justify-between py-3 px-4 ">
          <div className="flex items-start flex-col gap-1">
            <span className=" text-sm font-semibold">Lives in</span>
            <span className="text-gray-400 text-[13px]">Los Angeles, CA</span>
          </div>
          <MdSchool size={23} color="gray" />
        </li>
        <hr />
      </ul>
      <div className="bg-white w-full rounded-lg py-3 px-4 text-base font-semibold dark:bg-secbg">
        Photos
      </div>
      <div className="flex w-full my-3  flex-wrap ">
        <div className="w-1/4 h-[110px] md:h-[80px]  relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px] "
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative ">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
        <div className="w-1/4 h-[110px] md:h-[80px] relative">
          <Image
            src="/jenna.webp"
            fill={true}
            alt=""
            className=" rounded-xl p-[6px]"
          />
        </div>
      </div>
      <div className="bg-white w-full rounded-lg py-3 px-4 text-base font-semibold dark:bg-secbg flex justify-between items-center">
        Friends
        <div className=" relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical
                size={18}
                className="text-slate-100  h-9 w-9 p-2 rounded-full   transition-all duration-300 cursor-pointer  hover:bg-slate-700  "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-fit flex items-center flex-col rounded-xl absolute right-0 ">
              <ul className="flex items-center w-[250px]  flex-col ">
                <li className="px-2 py-2 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Heart size={20} color="gray" />
                    <div className="flex flex-col ">
                      <span className="text-[12px] font-semibold">
                        All friends
                      </span>
                      <span className="text-[12px] text-slate-400">
                        View all friends
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ul className="bg-white dark:bg-secbg w-full my-3 rounded-lg">
        {userInfo?.friends?.length > 0
          ? userInfo?.friends?.map((friend: UserInfoType) => (
              <li className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={friend.photo} />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold">
                      {friend.name}
                    </span>
                    <span className="text-[12px] text-slate-400">
                      Fronend Develpore
                    </span>
                  </div>
                </div>
              </li>
            ))
          : ""}
        <hr />
      </ul>
    </div>
  );
}
