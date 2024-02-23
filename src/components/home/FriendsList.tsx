"use client";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { fetchUserInfo } from "@/app/actions/action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserInfoType } from "@/app/type/types";
import { useEffect, useState } from "react";

export default function FriendsList({ userInfo }: { userInfo: UserInfoType }) {
  return (
    <div className="md:flex hidden flex-col  bg-white dark:bg-secbg py-2 text-center  rounded-xl w-full mx-auto justify-center ">
      <div className="py-2 flex items-center justify-between w-full ">
        <span className="text-sm font-medium tracking-wider px-3 ">
          Friends
        </span>
        <MoreVertical
          size={18}
          className="text-slate-500  h-9 w-9 p-2 rounded-full  hover:text-sky-600 transition-all duration-300 cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100  "
        />
      </div>
      <hr className="text-slate-800  w-full h-[2px] " />
      {userInfo && (
        <ul className="flex items-center w-full  pb-3 flex-col ">
          {userInfo?.friends?.length > 0 ? (
            userInfo?.friends?.map((f: UserInfoType) => (
              <li
                key={f._id}
                className=" p-3 flex items-center justify-between w-full pb-3   cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <div className="flex items-center gap-2 ">
                  <Avatar>
                    <AvatarImage src={f.photo} />
                  </Avatar>
                  <div className="lg:flex flex-col items-start hidden">
                    <span className="text-[12px] font-semibold">{f.name}</span>
                    <span className="text-[12px] text-slate-400">
                      {f.profession && f.profession}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className=" text-sm font-bold pt-2 text-sky-500">
              You have no friends currently
            </p>
          )}
        </ul>
      )}
    </div>
  );
}

// shded@gmail.com
// Toha@gmail.com
// Ali@gmail.com
// Gad@gmail.com
