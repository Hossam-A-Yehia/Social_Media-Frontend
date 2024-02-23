import { Bell, Heart, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { UserDropMenu } from "./UserDropMenu";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-900 relative">
      <div className="flex items-center gap-[60px]">
        <Link href="/">
          <Image
            src="https://friendkit.cssninja.io/assets/img/vector/logo/friendkit-bold.svg"
            height={40}
            width={40}
            alt="LOGO"
          />
        </Link>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer group rounded-lg p-[10px] hover:bg-red-600 transition-all duration-300  ">
            <Heart
              size={20}
              className="transition-all duration-300 text-slate-300   group-hover:text-white"
            />
          </div>
          <div className="cursor-pointer group rounded-lg p-[10px] hover:bg-sky-600 transition-all duration-300  ">
            <Bell
              size={20}
              className="transition-all duration-300 text-slate-300   group-hover:text-white"
            />
          </div>
          <div className="cursor-pointer group rounded-lg p-[10px] hover:bg-sky-600 transition-all duration-300  ">
            <Mail
              size={20}
              className="transition-all duration-300 text-slate-300   group-hover:text-white"
            />
          </div>
          <div className="cursor-pointer group rounded-lg p-[10px] hover:bg-sky-600 transition-all duration-300  ">
            <MessageSquare
              size={20}
              className="transition-all duration-300 text-slate-300   group-hover:text-white"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <form className="w-[400px] rounded-full hidden md:block ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative rounded-full">
            <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300  bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none placeholder:text-sm  placeholder:text-slate-400 rounded-full"
              placeholder="Search..."
              required
            />
          </div>
        </form>
        <UserDropMenu />
      </div>
    </div>
  );
}
export default Nav;
