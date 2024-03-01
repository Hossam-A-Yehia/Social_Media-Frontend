"use client";
import { MdClose, MdDelete } from "react-icons/md";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AiOutlineLike } from "react-icons/ai";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  fetchComments,
  fetchUserInfo,
  likeComment,
} from "@/app/actions/action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CommentType, ReplyType } from "@/app/type/types";
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
import { format } from "timeago.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Comments({
  setPostId,
  token,
  postId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  postId: string;
}) {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [reply, setReply] = useState("");
  const [commentMode, setCommentMode] = useState("Comment");
  const [reRender, setReRender] = useState(0);
  const { data }: any = useSession();

  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(token, postId),
  });

  const userId = data?.user?.user?._id;

  const from = data?.user?.user?.name;

  const commentMutations = useMutation({
    mutationFn: ({
      token,
      comment,
      from,
      postId,
    }: {
      token: string;
      comment: string;
      from: string;
      postId: string;
    }) => addComment({ token, comment, from, postId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const handleSubmitComment = async () => {
    commentMutations.mutate({ token, comment, from, postId });
    setComment(" ");

    toast.success("A comment has been added", {
      style: {
        padding: " 20px",
        borderRadius: "10px",
        background: "#2196f3",
        color: "#fff",
      },
    });
  };

  const deleteCommentMutations = useMutation({
    mutationFn: ({
      token,
      postId,
      commentId,
    }: {
      token: string;
      postId: string;
      commentId: string;
    }) => deleteComment({ token, postId, commentId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const handleDeleteComment = async (commentId: string) => {
    deleteCommentMutations.mutate({
      token,
      postId,
      commentId,
    });

    toast.error("The comment has been deleted", {
      style: {
        padding: " 20px",
        borderRadius: "10px",
        background: "#f44336",
        color: "#fff",
      },
    });
  };

  const deleteReplyMutations = useMutation({
    mutationFn: ({
      token,
      commentId,
      replyId,
    }: {
      token: string;
      commentId: string;
      replyId: string;
    }) => deleteReply({ token, commentId, replyId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const handleDeleteReply = async (commentId: string, replyId: string) => {
    deleteReplyMutations.mutate({
      token,
      commentId,
      replyId,
    });

    toast.error("The reply has been deleted", {
      style: {
        padding: " 20px",
        borderRadius: "10px",
        background: "#f44336",
        color: "#fff",
      },
    });
  };

  const replyMutations = useMutation({
    mutationFn: ({
      token,
      reply,
      from,
      commentId,
    }: {
      token: string;
      reply: string;
      from: string;
      commentId: string;
    }) => addReply({ token, reply, from, commentId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const handleSubmitReply = async () => {
    replyMutations.mutate({ token, reply, from, commentId });

    toast.success("A reply has been added", {
      style: {
        padding: " 20px",
        borderRadius: "10px",
        background: "#2196f3",
        color: "#fff",
      },
    });
    setReply(" ");
  };

  const likeMutations = useMutation({
    mutationFn: ({
      token,
      commentId,
      replayId,
    }: {
      token: string;
      commentId: string;
      replayId: string;
    }) => likeComment({ token, commentId, replayId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const handleLike = async (commentId: string, replayId: string) => {
    likeMutations.mutate({ token, commentId, replayId });
    setReRender(reRender + 1);
  };

  return (
    <div className="flex items-start flex-col w-full  border-[1px] border-slate-300 dark:border-secbg bg-white dark:bg-secbg p-4  rounded-lg relative">
      <div className="flex items-center justify-between w-full text-sm text-gray-400 font-semibold tracking-wider pb-2">
        <span>Comments({comments?.length}) </span>
        <MdClose
          onClick={() => setPostId("")}
          size={20}
          className=" cursor-pointer hover:text-red-500 duration-300 hover:scale-110 will-change-scroll"
        />
      </div>
      <div className="flex items-start flex-col w-full overflow-y-scroll max-h-[400px]">
        {isLoading && (
          <Image
            src="/Ellipsis-1s-200px.gif"
            height={70}
            width={70}
            alt="dd"
            className="mx-auto"
          />
        )}
        {comments?.map((comment: CommentType) => (
          <div
            className="flex justify-between items-start w-full border-t border-gray-300 dark:border-gray-500 "
            key={comment._id}
          >
            <div className="py-3 flex items-start flex-col justify-between w-full   ">
              <div className="flex items-start  gap-3 mt-2 ">
                <Avatar>
                  <AvatarImage src={comment.userId.photo} />
                </Avatar>
                <div className="flex flex-col ">
                  <span className="text-[12px] font-semibold tracking-wider text-slate-900 dark:text-slate-200">
                    {comment?.userId.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {format(comment.createdAt)}
                  </span>
                  <p className="text-xs text-slate-800 dark:text-gray-200 mt-2 leading-5 ">
                    {comment.comment}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      onClick={() => {
                        handleLike(comment._id, "");
                      }}
                      className={`flex items-center gap-1 cursor-pointer  text-xs hover:text-sky-700 duration-300 ${
                        !comment.likes.includes(userId)
                          ? "text-gray-400"
                          : "text-sky-700"
                      } `}
                    >
                      <AiOutlineLike size={15} className="" />
                      {comment.likes.length}
                    </div>
                    <span
                      className="text-[11px] font-[500] cursor-pointer hover:text-sky-700 duration-300"
                      onClick={() => {
                        setCommentMode("Reply");
                        setCommentId(comment._id);
                      }}
                    >
                      Reply
                    </span>
                  </div>
                </div>
              </div>
              {comment.replies?.length > 0 &&
                comment?.replies?.map((reply: any) => (
                  <div
                    key={reply._id}
                    className="pl-10 flex items-start justify-between w-full pt-3 mt-2 border-t border-gray-300 dark:border-gray-500"
                  >
                    <div className="flex items-start gap-3 mt-2">
                      <Avatar>
                        <AvatarImage src={reply.userId.photo} />
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold tracking-wider text-slate-900 dark:text-slate-200">
                          {reply?.userId.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {format(reply.created_At)}
                        </span>
                        <p className="text-xs text-slate-800 dark:text-gray-200 mt-2 leading-5 border-l pl-4  border-gray-400 relative before:content-[''] before:left-[-8px] before:top-1/2 before:-translate-y-1/2 before:size-[15px] before:rounded-full before:absolute before:bg-secbg before:border before:border-gray-400">
                          {reply.comment}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div
                            onClick={() => {
                              handleLike(comment._id, reply._id);
                            }}
                            className={`flex items-center gap-1 cursor-pointer  text-xs hover:text-sky-700 duration-300 ${
                              !reply.likes.includes(userId)
                                ? "text-gray-400"
                                : "text-sky-700"
                            } `}
                          >
                            <AiOutlineLike size={15} className="" />
                            {reply.likes.length}
                          </div>
                          <div
                            onClick={() => {
                              handleDeleteReply(comment._id, reply._id);
                            }}
                            className=" cursor-pointer text-xs text-gary-400 hover:text-sky-700 hover:font-semibold"
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {comment.userId._id === userId && (
              <AlertDialog>
                <AlertDialogTrigger className="px-2 py-2 flex items-center justify-center size-[40px]  cursor-pointer hover:bg-red-500  transition-all duration-300 text-gray-500 hover:text-white rounded-full  ">
                  <MdDelete size={20} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete your post
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        ))}
      </div>
      {comments?.length <= 0 && (
        <p className=" text-base font-bold pt-2 mb-2 text-sky-500 mx-auto">
          No comments yet, add the first comment
        </p>
      )}
      {commentMode === "Comment" ? (
        <div className=" rounded-lg w-full bg-slate-100 dark:bg-mainbg my-2 border border-gray-200 dark:border-gray-600  ">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=" bg-transparent p-3 placeholder:text-sm text-sm w-full focus:outline-none h-[150px]"
            placeholder="Write a comment..."
          />
          <div className="flex items-center justify-between dark:bg-secbg bg-white w-full p-3  rounded-b-lg ">
            {commentMutations.isPending ? (
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block ml-auto duration-300  h-[40px] w-[146px]  text-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mx-auto text-white animate-spin "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleSubmitComment()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block ml-auto duration-300 h-[40px] w-[146px]    text-center"
              >
                Add comment
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className=" rounded-lg w-full bg-slate-100 dark:bg-mainbg my-2 border border-gray-200 dark:border-gray-600  ">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className=" bg-transparent p-3 placeholder:text-sm text-sm w-full focus:outline-none h-[150px]"
            placeholder="Write a reply..."
          />
          <div className="flex items-center justify-between dark:bg-secbg bg-white w-full p-3  rounded-b-lg ">
            {replyMutations.isPending ? (
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block ml-auto duration-300  h-[40px] w-[146px]  text-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mx-auto text-white animate-spin "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleSubmitReply()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block ml-auto duration-300  h-[40px] w-[146px]  text-center"
              >
                Post Reply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
