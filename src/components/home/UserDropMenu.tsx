"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../ModeToggle";
import { Check, LifeBuoy, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserInfoType } from "@/app/type/types";

export function UserDropMenu({ userInfo }: { userInfo: UserInfoType }) {
  const logOut = () => {
    signOut({
      callbackUrl: "http://localhost:3000/login",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={userInfo?.photo} className=" cursor-pointer" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-[350px] me-2 flex items-center flex-col rounded-xl  ">
        <div className="py-3  px-6 flex items-center justify-between w-full ">
          <span className="text-xs font-semibold text-slate-400">
            {userInfo?.name}
          </span>
          <ModeToggle />
        </div>
        <hr className="text-slate-800  w-full h-[2px] " />
        <ul className="flex items-center w-full  pb-3 flex-col ">
          <Link
            href={`/profile/${userInfo?._id}`}
            className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userInfo?.photo} />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold">
                  {userInfo?.name}
                </span>
                <span className="text-[12px] text-slate-400">Main account</span>
              </div>
            </div>
            <Check size={20} color="green" />
          </Link>
          <hr className="text-slate-800  w-full h-[2px]" />
          <li className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://friendkit.cssninja.io/assets/img/avatars/hanzo.svg" />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold">EreYehia</span>
                <span className="text-[12px] text-slate-400">Company page</span>
              </div>
            </div>
          </li>
          <li className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://friendkit.cssninja.io/assets/img/vector/icons/logos/fastpizza.svg" />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold">Vercel</span>
                <span className="text-[12px] text-slate-400">Company page</span>
              </div>
            </div>
          </li>
        </ul>
        <hr className="text-slate-800  w-full h-[2px] " />
        <ul className="flex items-center w-full  pb-3 flex-col ">
          <li className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <div className="flex flex-col ">
                <span className="text-[12px] font-semibold">Setting</span>
                <span className="text-[12px] text-slate-400">
                  Access widget seting
                </span>
              </div>
            </div>
          </li>
          <li className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="flex items-center gap-3">
              <LifeBuoy size={20} />
              <div className="flex flex-col ">
                <span className="text-[12px] font-semibold">Help</span>
                <span className="text-[12px] text-slate-400">
                  Contact our support
                </span>
              </div>
            </div>
          </li>
          <li
            onClick={() => logOut()}
            className="px-6 py-3 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <div className="flex flex-col ">
                <span className="text-[12px] font-semibold">Log out</span>
                <span className="text-[12px] text-slate-400">
                  Log out from your account
                </span>
              </div>
            </div>
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
