"use client";
import { MoreVertical, UserPlus } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { fetchSuggestedFriends, sendRequest } from "@/app/actions/action";
import { MdOutlineDoneAll } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SuggestedFriendsType } from "@/app/type/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SuggestedFrients({
  token,
  userInfo,
}: {
  token: string;
  userInfo: SuggestedFriendsType;
}) {
  const queryClient = useQueryClient();
  const { data: suggestedFrients, isLoading } = useQuery({
    queryKey: ["sfriends"],
    queryFn: () => fetchSuggestedFriends(token),
  });

  const sendRequestMutation = useMutation({
    mutationFn: ({ token, requestTo }: { token: string; requestTo: string }) =>
      sendRequest({ token, requestTo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.invalidateQueries({ queryKey: ["sfriends"] });
    },
  });

  const handleSendRequest = async (requestTo: string, name: string) => {
    sendRequestMutation.mutate({ token, requestTo });
    toast.success(
      `A friend request has been sent to ${name.split(" ")[0]}, waiting for ${
        name.split(" ")[0]
      } to accept the request`,
      {
        style: {
          padding: " 20px",
          borderRadius: "10px",
          background: "#2196f3",
          color: "#fff",
        },
      }
    );
  };

  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ x: 100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      className="md:flex hidden flex-col px-3 bg-white dark:bg-secbg py-2 text-center  rounded-xl w-full mx-auto justify-center "
    >
      <div className="py-2 flex items-center justify-between w-full ">
        <span className="text-sm font-medium tracking-wider ">
          Suggested Friends
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
      {suggestedFrients?.length <= 0 && (
        <p className=" text-sm font-bold pt-2 text-sky-500">
          No friends suggested
        </p>
      )}
      <ul className="flex items-center w-full  pb-3 flex-col ">
        {suggestedFrients?.map((f: SuggestedFriendsType) => (
          <li
            key={f._id}
            className=" py-3 flex items-center justify-between w-full pb-3  "
          >
            <Link
              href={`/profile/${f._id}`}
              className="flex items-center gap-2"
            >
              <Avatar>
                <AvatarImage src={f.photo} />
              </Avatar>
              <div className="lg:flex flex-col items-start hidden">
                <span className="text-[12px] font-semibold">{f.name}</span>
                <span className="text-[12px] text-slate-400">
                  {f.profession && f.profession}
                </span>
              </div>
            </Link>
            {userInfo?.requestsFriend?.includes(f._id) ? (
              <MdOutlineDoneAll
                size={18}
                className={` size-8 p-1.5 rounded-full  transition-all duration-300 text-sky-600  `}
              />
            ) : (
              <UserPlus
                onClick={() => handleSendRequest(f._id, f.name)}
                size={18}
                className={`text-slate-500 size-9 p-2 rounded-full  hover:text-sky-600 transition-all duration-300 cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100 `}
              />
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
