"use client";
import {
  Edit,
  Heart,
  Link as ILink,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { PostsType, SessionType } from "@/app/type/types";
import { format } from "timeago.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import { deletePost, likePost, viewProfile } from "@/app/actions/action";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import UpdatePost from "./UpdatePost";
import Comments from "./Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function CardPost({ post }: { post: PostsType }) {
  const [updating, setUpdating] = useState(false);
  const [postId, setPostId] = useState("");
  const session: any = useSession();
  const userId = session?.data?.user?.user?._id;
  const token = session?.data?.user?.token;

  const queryClient = useQueryClient();

  const likeMutations = useMutation({
    mutationFn: ({ token, postId }: { token: string; postId: string }) =>
      likePost({ token, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostMutations = useMutation({
    mutationFn: ({ postId, token }: { postId: string; token: string }) =>
      deletePost({ postId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = async (postId: string) => {
    likeMutations.mutate({
      token,
      postId,
    });
  };

  const handleDelete = async (postId: string) => {
    deletePostMutations.mutate({
      token,
      postId,
    });
  };

  return (
    <>
      <>
        {postId === post._id ? (
          <Comments setPostId={setPostId} token={token} postId={postId} />
        ) : (
          <div
            key={post._id}
            className="flex items-start flex-col w-full  border-[1px] border-slate-300 dark:border-secbg bg-white dark:bg-secbg p-4  rounded-lg relative"
          >
            <div className="py-2 flex items-center justify-between w-full ">
              <div className="flex items-center gap-3">
                <Link href={`/profile/${post.userId._id}`}>
                  <Avatar>
                    <AvatarImage src={post.userId.photo} />
                  </Avatar>
                </Link>

                <div className="flex flex-col items-start">
                  <Link href={`/profile/${post.userId._id}`}>
                    <span className="text-[12px] font-semibold">
                      {post.userId.name}
                    </span>
                  </Link>
                  <span className="text-[12px] text-slate-400">
                    {format(post.createdAt)}
                  </span>
                </div>
              </div>
              {userId === post.userId._id && (
                <div className=" absolute right-0 m-2 ">
                  <ul className="flex items-center gap-2 ">
                    <AlertDialog>
                      <AlertDialogTrigger className="px-2 py-2 flex items-center justify-center size-[40px]  cursor-pointer hover:bg-red-500  transition-all duration-300 text-gray-500 hover:text-white rounded-full">
                        <MdDelete size={20} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will delete your
                            post
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <li
                      onClick={() => {
                        setUpdating(true);
                      }}
                      className="px-2 py-2 flex items-center justify-center size-[40px]  cursor-pointer hover:bg-sky-700  transition-all duration-300  text-gray-500 hover:text-white rounded-full "
                    >
                      <Edit size={20} />
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="text-slate-800 dark:text-slate-300 text-sm leading-6 my-3 ">
              {post.description}
            </p>
            {post.image && (
              <Image
                src={post.image}
                width={200}
                height={300}
                alt=""
                className="w-full rounded-lg h-[400px]"
              />
            )}
            <div className="flex items-center gap-2 absolute bottom-[50px] right-5">
              <div
                className="flex items-center justify-center bg-sky-600 rounded-full h-11 w-11 p-3 text-slate-100 cursor-pointer hover:bg-sky-700 transition-all duration-300  "
                onClick={() => setPostId(post._id)}
              >
                <MessageCircle />
              </div>
              <div className="flex items-center justify-center bg-sky-600 rounded-full h-11 w-11 p-3 text-slate-100 cursor-pointer hover:bg-sky-700 transition-all duration-300">
                <ILink />
              </div>
              <div
                onClick={() => handleLike(post._id)}
                className={`flex items-center justify-center  rounded-full h-11 w-11 p-3  transition-all duration-150 cursor-pointer  ${
                  !post.likes.includes(userId) ? "bg-white" : "bg-red-500"
                } `}
              >
                <Heart
                  className={` transition-all duration-150 ${
                    !post.likes.includes(userId) ? "text-red-500" : "text-white"
                  }
                    `}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-[30px] w-full">
              <p className="text-xs text-slate-900 dark:text-slate-300 font-bold ">
                {post.likes.length} more liked this
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-xs gap-1 text-slate-500">
                  <FaHeart size={20} />
                  {post.likes.length}
                </div>
                <div className="flex items-center text-xs gap-1 text-slate-500">
                  <ILink size={20} />7
                </div>
                <div className="flex items-center text-xs gap-1 text-slate-500">
                  <MessageCircle size={20} />
                  {post.comments.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {updating && (
        <UpdatePost token={token} setUpdating={setUpdating} post={post} />
      )}
    </>
  );
}
