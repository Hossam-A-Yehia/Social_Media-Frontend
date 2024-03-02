"use client";
import { Camera, Pin, Video, Image as Imgs, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deployPost } from "@/app/actions/action";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserInfoType } from "@/app/type/types";
import { motion } from "framer-motion";

export default function DeployBox({
  token,
  userInfo,
}: {
  token: string;
  userInfo: UserInfoType;
}) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<string | "">("");
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFile(event?.target?.files?.[0] as unknown as string);
  };

  const queryClient = useQueryClient();

  const postMutations = useMutation({
    mutationFn: ({
      token,
      description,
      image,
    }: {
      token: string;
      description: string;
      image: string;
    }) => deployPost({ token, description, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeployImg = async () => {
    file && setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SocialMedia");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dimy2zhcs/image/upload",
        formData
      );
      setImage(response?.data?.secure_url);
      setLoadingImage(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setLoadingImage(false);
    }
  };

  useEffect(() => {
    handleDeployImg();
  }, [file]);

  const handleSubmotPost = () => {
    postMutations.mutate({
      token,
      description,
      image,
    } as any);
    setImage("");
    setDescription("");
  };

  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ y: -100, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-start flex-col w-full rounded border-[1px] border-slate-300 dark:border-secbg"
    >
      <ul className="flex items-center justify-between bg-[#fcfcfc] dark:bg-secbg  w-full">
        <li className="px-[50px] py-4 text-center  w-full flex items-center text-sm gap-2 bg-white dark:bg-gray-800 border-r-[1px] border-slate-300 dark:border-secbg transition-all duration-300 cursor-pointer font-semibold text-slate-600 dark:text-slate-300">
          <Pin size={18} /> Publish
        </li>
        <label htmlFor="img_post">
          <li className="px-[50px] py-4 w-full text-center flex items-center text-sm gap-2  hover:bg-gray-300 border-b-[1px] border-slate-300 dark:border-secbg transition-all duration-300 cursor-pointer font-semibold text-slate-600 dark:text-slate-300 dark:hover:bg-gray-700">
            <Imgs size={18} /> Albums
          </li>
        </label>
        <input
          type="file"
          name="img_post"
          id="img_post"
          className="hidden"
          onChange={handleFileChange}
        />
        <li className="px-[50px] py-4  w-full text-center  lg:flex items-center text-sm gap-2  hover:bg-gray-300 dark:hover:bg-gray-700 border-b-[1px] border-slate-300 transition-all duration-300 cursor-pointer font-semibold text-slate-600 dark:text-slate-300 dark:border-secbg hidden ">
          <Video size={18} /> Video
        </li>
      </ul>
      <div className="flex items-start gap-3 w-full p-4 bg-white dark:bg-gray-800">
        <Avatar>
          <AvatarImage src={userInfo?.photo} />
        </Avatar>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none h-[50px] border-none bg-transparent"
          placeholder="Write something about you..."
        ></textarea>
      </div>
      {image && !loadingImage && (
        <div className="w-full relative h-[400px] bg-[#1f2937] ">
          <Image
            src={image}
            alt="Post Image"
            fill
            className="p-6 rounded-lg "
          />
        </div>
      )}

      {loadingImage && (
        <div className="w-full relative h-[400px] bg-[#1f2937] p-6 ">
          <div className="animate-pulse bg-slate-700 h-full rounded-lg  "></div>
        </div>
      )}

      <hr className="text-slate-800  w-full h-[2px] " />
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 w-full p-3">
        <div className="flex w-fit bg-slate-100 dark:bg-secbg items-center gap-2 px-3 py-1 text-sm rounded-full text-gray-500 dark:text-slate-300">
          <Camera size={23} />
          Media
        </div>
        <div className="flex w-fit bg-slate-100 dark:bg-secbg items-center gap-2 px-3 py-1 text-sm rounded-full text-gray-500 dark:text-slate-300">
          <Image
            src="https://friendkit.cssninja.io/assets/img/icons/emoji/emoji-1.svg"
            width={22}
            height={22}
            alt=""
          />
          Activity
        </div>
        <div className="flex w-fit bg-slate-100 dark:bg-secbg items-center justify-start gap-2 px-3 py-1 text-sm rounded-full text-gray-500 dark:text-slate-300">
          <MoreVertical
            size={19}
            className="text-slate-500  rounded-full  hover:text-sky-600 transition-all duration-300 cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100"
          />
        </div>
        {postMutations.isPending ? (
          <button
            disabled={postMutations.isPending}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center ml-auto duration-300 w-[100px] h-[40px]   text-center disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={postMutations.isPending}
            type="button"
            onClick={() => handleSubmotPost()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block ml-auto duration-300 w-[100px] h-[40px]   text-center "
          >
            Publish
          </button>
        )}
      </div>
    </motion.div>
  );
}
