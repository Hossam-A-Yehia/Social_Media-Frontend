import { Bookmark, MoreVertical, Plus } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function Stories() {
  return (
    <div className="lg:flex flex-col px-3 bg-white dark:bg-secbg py-2 text-center  rounded-xl w-full mx-auto justify-center hidden ">
      <div className="py-2 flex items-center justify-between w-full ">
        <span className="text-sm font-medium tracking-wider ">Stories</span>
        <MoreVertical
          size={18}
          className="text-slate-500  h-9 w-9 p-2 rounded-full  hover:text-sky-600 transition-all duration-300 cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100  "
        />
      </div>
      <hr className="text-slate-800  w-full h-[2px] " />
      <div className=" flex items-center gap-3 py-3">
        <div className="flex items-center justify-center rounded-full h-12 w-12 p-3 border-[2px]  border-dashed border-slate-300 transition-all duration-500 hover:border-solid hover:border-sky-600 hover:rotate-[180deg] cursor-pointer group">
          <Plus className="text-slate-400 group-hover:text-sky-600 transition-all duration-500" />
        </div>
        <div className="flex flex-col items-start text-left gap-1">
          <span className="text-sm font-semibold ">Add a new story</span>
          <span className="text-xs text-slate-400">
            Share an image, avideo ro some text
          </span>
        </div>
      </div>
      <hr className="text-slate-800  w-full h-[2px] " />
      <ul className="flex items-center w-full  pb-3 flex-col ">
        <li className=" py-3 flex items-center justify-between w-full pb-3  ">
          <div className="flex items-center gap-2">
            <div className="border-[1px] border-slate-400 p-1 rounded-full">
              <Avatar>
                <AvatarImage src="https://friendkit.cssninja.io/assets/img/avatars/elise.jpg" />
              </Avatar>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold">Elise Salker</span>
              <span className="text-[12px] text-slate-400">1 hour ago</span>
            </div>
          </div>
        </li>
        <hr className="text-slate-800  w-full h-[2px] " />

        <li className=" py-3 flex items-center justify-between w-full pb-3  ">
          <div className="flex items-center gap-2">
            <div className="border-[1px] border-slate-400 p-1 rounded-full">
              <Avatar>
                <AvatarImage src="https://friendkit.cssninja.io/assets/img/avatars/bobby.jpg" />
              </Avatar>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold">Bobby Brown</span>
              <span className="text-[12px] text-slate-400">3 days ago</span>
            </div>
          </div>
        </li>
        <hr className="text-slate-800  w-full h-[2px] " />

        <li className=" py-3 flex items-center justify-between w-full pb-3  ">
          <div className="flex items-center gap-2">
            <div className="border-[1px] border-slate-400 p-1 rounded-full">
              <Avatar>
                <AvatarImage src="https://friendkit.cssninja.io/assets/img/avatars/dan.jpg" />
              </Avatar>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold">Dan Walker</span>
              <span className="text-[12px] text-slate-400">Last week</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
