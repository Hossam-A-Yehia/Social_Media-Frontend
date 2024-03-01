"use client";
import { User, Image as ImgIcon, Lock, Flag } from "lucide-react";

function ProgressBar({ prog }: { prog: string }) {
  return (
    <div className=" bg-white dark:bg-slate-900 w-[280px] sm:w-[350px] md:w-[500px]   mx-auto h-4 relative  mb-2">
      <div className=" relative w-[280px] sm:w-[350px] md:w-[500px]  h-[5px] top-[5px] bg-gray-200 dark:bg-slate-800">
        <div
          className={` absolute h-2 bg-sky-600 transition-all duration-500`}
          style={{ width: `${prog}` }}
        ></div>
      </div>
      <div className="flex items-center justify-between relative ">
        <div
          className={`rounded-full transition-all duration-500  p-2 size-9 relative top-[-18px] flex items-center bg-white dark:bg-slate-900 scale-125 border-[1px] border-sky-600`}
        >
          <User className=" text-sky-600 " />
        </div>
        <div
          className={`rounded-full transition-all duration-500  p-2 size-9 relative top-[-18px] flex items-center bg-white dark:bg-slate-900 ${
            prog !== "0%" ? "border-[1px] border-sky-600 scale-125" : ""
          } `}
        >
          <ImgIcon
            className={` transition-all duration-500  ${
              prog !== "0%" ? "text-sky-600" : "text-gray-200"
            }`}
          />
        </div>{" "}
        <div
          className={`rounded-full transition-all duration-500  p-2 size-9 relative top-[-18px] flex items-center bg-white dark:bg-slate-900 ${
            prog !== "0%" && prog !== "33.33%"
              ? "border-[1px] border-sky-600 scale-125"
              : ""
          } `}
        >
          <Lock
            className={` transition-all duration-500  ${
              prog !== "0%" && prog !== "33.33%"
                ? "text-sky-600"
                : "text-gray-200"
            }`}
          />
        </div>
        <div
          className={`rounded-full transition-all duration-500  p-2 size-9 relative top-[-18px] flex items-center bg-white dark:bg-slate-900 ${
            prog === "100%" ? "border-[1px] border-sky-600 scale-125" : ""
          } `}
        >
          <Flag
            className={` transition-all duration-500  ${
              prog === "100%" ? "text-sky-600" : "text-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
export default ProgressBar;
