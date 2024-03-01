"use client";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserInfoType } from "@/app/type/types";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FriendsList({
  userInfo,
  isLoading,
}: {
  userInfo: UserInfoType;
  isLoading: boolean;
}) {
  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ x: -100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      className="md:flex hidden flex-col  bg-white dark:bg-secbg py-2 text-center  rounded-xl w-full mx-auto justify-center "
    >
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
      {isLoading && (
        <Image
          src="/Ellipsis-1s-200px.gif"
          height={70}
          width={70}
          alt="dd"
          className="mx-auto"
        />
      )}
      {userInfo && (
        <ul className="flex items-center w-full   flex-col ">
          {userInfo?.friends?.length > 0 ? (
            userInfo?.friends?.map((f: UserInfoType) => (
              <Link
                href={`/profile/${f._id}`}
                key={f._id}
                className=" p-3 flex items-center justify-between w-full   cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
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
              </Link>
            ))
          ) : (
            <p className=" text-sm font-bold pt-2 text-sky-500">
              You do not have any friends yet
            </p>
          )}
        </ul>
      )}
    </motion.div>
  );
}

// shded@gmail.com
// Toha@gmail.com
// Ali@gmail.com
// Gad@gmail.com
