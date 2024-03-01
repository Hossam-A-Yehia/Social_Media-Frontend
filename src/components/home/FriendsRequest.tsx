"use client";
import { MoreVertical, X } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { accesptRequest, fetchFriendRequest } from "@/app/actions/action";
import Image from "next/image";
import { motion } from "framer-motion";

import { MdOutlineDone } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RequestFriendsType } from "@/app/type/types";
export default function FriendsRequest({ token }: { token: string }) {
  const queryClient = useQueryClient();

  const { data: friendsRequest, isLoading } = useQuery({
    queryKey: ["rfriends"],
    queryFn: () => fetchFriendRequest(token),
  });
  const acceptRequestMutation = useMutation({
    mutationFn: ({
      token,
      requestId,
      status,
    }: {
      token: string;
      requestId: string;
      status: string;
    }) => accesptRequest({ token, requestId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.invalidateQueries({ queryKey: ["rfriends"] });
      queryClient.invalidateQueries({ queryKey: ["sfriends"] });
    },
  });

  const handleAccept = async (requestId: string, status: string) => {
    acceptRequestMutation.mutate({ token, requestId, status });
    toast.success(
      `Your friend request has been accepted, you are friends now`,
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
      className="flex flex-col px-3 bg-white dark:bg-secbg py-2 text-center  rounded-xl w-full mx-auto justify-center "
    >
      <div className="py-2 flex items-center justify-between w-full ">
        <span className="text-sm font-medium tracking-wider ">
          Friends Request
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
      <ul className="flex items-center w-full  pb-3 flex-col ">
        {friendsRequest?.length <= 0 && (
          <p className=" text-sm font-bold pt-2 text-sky-500">
            No friend requests yet
          </p>
        )}
        {friendsRequest
          ?.filter((e: RequestFriendsType) => e.requestStatus === "Pending")
          ?.map((f: RequestFriendsType) => (
            <li
              key={f._id}
              className=" py-3 flex items-center justify-between w-full pb-3  "
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={f.requestFrom.photo} />
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-[12px] font-semibold">
                    {f.requestFrom.name}
                  </span>
                  <span className="text-[12px] text-slate-400">Fast Food</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <MdOutlineDone
                  size={18}
                  className="p-1.5 flex items-center justify-center size-[35px]  cursor-pointer hover:bg-sky-700  transition-all duration-300  hover:text-white text-sky-700 rounded-full "
                  onClick={() => handleAccept(f._id, "Accepted")}
                />
                <X
                  size={18}
                  className="p-1.5 flex items-center justify-center size-[35px]  cursor-pointer hover:bg-red-500  transition-all duration-300  hover:text-white text-red-500 rounded-full"
                />
              </div>
            </li>
          ))}
      </ul>
    </motion.div>
  );
}
