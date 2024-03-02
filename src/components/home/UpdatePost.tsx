"use client";
import { updatePost } from "@/app/actions/action";
import { PostsType } from "@/app/type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowBigLeftDash, CameraIcon, Edit, Edit3 } from "lucide-react";
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

export default function UpdatePost({
  post,
  setUpdating,
  token,
}: {
  post: PostsType;
  setUpdating: React.Dispatch<SetStateAction<boolean>>;
  token: string;
}) {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState(post?.description);
  const [file, setFile] = useState<string | "">("");
  const [image, setImage] = useState(post.image);

  const postId = post._id;

  const updatePostMutations = useMutation({
    mutationFn: ({
      token,
      description,
      image,
    }: {
      token: string;
      description: string;
      image: string;
    }) => updatePost({ token, description, image, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleUpdatePost = async () => {
    updatePostMutations.mutate({ token, description, image });
    setUpdating(false);
    toast.success("A post has been updated", {
      style: {
        padding: " 20px",
        borderRadius: "10px",
        background: "#2196f3",
        color: "#fff",
      },
    });
  };

  const handleDeployImg = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SocialMedia");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dimy2zhcs/image/upload",
        formData
      );
      setImage(response.data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleDeployImg();
  }, [file]);

  return (
    <div
      className={`bg-black/70 w-full h-full z-50 fixed top-0 left-0 flex justify-center items-center transition-all duration-300 `}
    >
      <div className="dark:bg-mainbg bg-white w-[450px] h-fit p-4 rounded-lg relative z-50">
        <div className="flex items-center justify-between border-b pb-2 border-b-gray-500">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Edit size={20} />
            Edit this post
          </div>
          <MdClose
            size={18}
            className="text-slate-100  h-9 w-9 p-2 rounded-full   transition-all duration-300 cursor-pointer  hover:bg-red-500  "
            onClick={() => setUpdating(false)}
          />
        </div>
        <form className="mt-3">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" bg-transparent text-slate-800 dark:text-slate-300 text-sm leading-6 my-3 focus:outline-none w-full"
            />
            <input
              type="file"
              id="updateImg"
              className="hidden "
              onChange={(e: any) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="updateImg"
              className="cursor-pointer size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-900 flex items-center justify-center transition-all duration-300"
            >
              <CameraIcon size={20} />
            </label>
          </div>
          {image ? (
            <Image
              src={image}
              width={200}
              height={200}
              alt=""
              className="w-full rounded-lg h-[300px]"
            />
          ) : (
            ""
          )}

          <div className="flex items-center justify-end mt-3 gap-2 pt-4 border-t border-gray-400 ">
            <button
              onClick={() => setUpdating(false)}
              type="button"
              className="text-gray-900 bg-slate-200 hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-secbg mb-2 duration-300 gap-1"
            >
              <ArrowBigLeftDash />
              Cancel
            </button>
            <button
              onClick={() => handleUpdatePost()}
              type="button"
              className="  text-white   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-sky-700 hover:bg-sky-800 mb-2 duration-300 gap-1 "
            >
              <Edit3 size={20} />
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
