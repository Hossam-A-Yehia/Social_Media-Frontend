import { FaCamera } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heart, Image as ImgIcon, MoreVertical, Plus } from "lucide-react";
import { FcAbout } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { UserInfoType } from "@/app/type/types";

export default function ProfileCover({ userInfo }: { userInfo: UserInfoType }) {
  return (
    <div className="group flex flex-col gap-3 relative">
      <div className=" relative w-full h-[350px] bg-cover bg-[url(/4.webp)] before:content-[''] before:bg-black/30 before:opacity-0 hover:before:opacity-100  before:w-full before:h-full before:left-0 before:top-0 before:absolute before:transition-all before:duration-300 ">
        <div className="  p-2 flex items-center gap-2  absolute z-10 cursor-pointer  group-hover:border-white border-[1px] border-transparent transition-all duration-300 m-2 text-white">
          <FaCamera
            size={20}
            className="group-hover:w-[18px] transition-all duration-300"
          />
          <span className="text-sm font-semibold hidden group-hover:block transition-all duration-300 ">
            Edit cover Image
          </span>
        </div>
        <div className=" absolute right-0 m-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical
                size={18}
                className="text-slate-100  h-9 w-9 p-2 rounded-full   transition-all duration-300 cursor-pointer  hover:bg-slate-700  "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-fit flex mr-10 items-center flex-col rounded-xl md:hidden ">
              <ul className="flex items-center w-[250px]  pb-3 flex-col ">
                <li className="px-2 py-2 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Heart size={20} color="gray" />
                    <div className="flex flex-col ">
                      <span className="text-[12px] font-semibold">Friends</span>
                      <span className="text-[12px] text-slate-400">
                        See Friends
                      </span>
                    </div>
                  </div>
                </li>
                <li className="px-2 py-2 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <ImgIcon size={20} color="gray" />
                    <div className="flex flex-col ">
                      <span className="text-[12px] font-semibold">Photo</span>
                      <span className="text-[12px] text-slate-400">
                        See all photos
                      </span>
                    </div>
                  </div>
                </li>
                <li className="px-2 py-2 flex items-center justify-between w-full pb-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FcAbout size={20} color="gray" />
                    <div className="flex flex-col ">
                      <span className="text-[12px] font-semibold">About</span>
                      <span className="text-[12px] text-slate-400">
                        See about info
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col absolute bottom-[-40px] -translate-x-1/2 left-1/2 ">
          <form className=" rounded-lg ">
            <div className="  text-center ">
              <Avatar className="size-[110px] overflow-visible   mx-auto  relative">
                <AvatarImage className=" rounded-full " src={userInfo?.photo} />
                <AvatarFallback>CN</AvatarFallback>
                <label htmlFor="Avatar">
                  <Plus className=" absolute z-[100] right-0 bottom-0  rounded-full size-9 p-2 text-white transition-all duration-300 bg-sky-600   cursor-pointer  " />
                </label>

                <input type="file" className="hidden" id="Avatar" />
              </Avatar>{" "}
            </div>
          </form>
          <h3 className="text-xl font-bold mt-2">{userInfo?.name}</h3>
          <span className="text-gray-400 text-sm text-center">
            {userInfo?.profession}
          </span>
        </div>
        <div className="md:flex items-center  gap-2 hidden">
          <button
            type="button"
            className="focus:outline-none text-white bg-[#009688] hover:bg-[#0096888f]  font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2   duration-300"
          >
            Photo
          </button>
          <Link
            href={`/profile/friends/${userInfo?._id}`}
            type="button"
            className="focus:outline-none text-white bg-[#2196F3] hover:bg-[#2196f385]   font-medium rounded-lg text-sm px-10 py-2.5 mb-2  duration-300"
          >
            Friends
          </Link>
        </div>
      </div>
    </div>
  );
}
