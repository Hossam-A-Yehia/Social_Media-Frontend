"use client";
import { Check, Lock, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { toast } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const { push } = useRouter();
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const session = useSession();
  console.log(session);

  const handleLogin = async () => {
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((e) => {
      if (e?.status === 200) {
        console.log(e);
        push("/");
      } else {
        toast.error(e?.error);
      }
    });
  };

  return (
    <div className="h-screen flex relative">
      <div className="w-1/3 lg:w-1/2 h-full  bg-sky-600 md:flex items-center justify-center hidden ">
        <h1
          className="text-4xl lg:text-6xl md:p-3 font-bold leading-[55px] lg:leading-[70px]  text-white "
          style={{ textShadow: "4px 4px #3180e1, 8px 8px #3180e1" }}
        >
          {" "}
          Join an <br /> Exciting Social <br /> Experience
        </h1>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-full  bg-white dark:bg-slate-800 flex items-center justify-center flex-col">
        <Avatar className="size-[130px] overflow-visible   mx-auto border-[3px] dark:border-gray-500  border-gray-200 p-2 relative">
          <AvatarImage className=" rounded-full " src="/jenna.webp" />
          <AvatarFallback>CN</AvatarFallback>
          <label htmlFor="Avatar">
            <Check
              className=" absolute z-[100] right-0 top-0 bg-green-400 rounded-full  p-2 text-white  cursor-pointer font-bold size-[35px] "
              strokeWidth={4}
            />
          </label>
        </Avatar>{" "}
        <form action="" className="w-full p-3 md:w-[400px] my-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <User size={20} color="gray" />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
              placeholder="Your email"
            />
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Lock size={20} color="gray" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
              placeholder="Your password"
            />
          </div>
          <button
            onClick={() => handleLogin()}
            type="button"
            className="text-white bg-sky-600 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full duration-300"
          >
            Login
          </button>

          <Link
            href="/reset-password"
            className="text-center text-sm text-gray-500 dark:text-slate-300 my-2 tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-slate-200 duration-300 block mx-auto"
          >
            Forgot password?
          </Link>
          <div className="text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-sky-400 hover:text-sky-500 duration-300 transition-all"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        <Avatar className="size-[100px] overflow-visible bg-white dark:bg-slate-800   mx-auto   p-2">
          <AvatarImage
            className=" rounded-full bg-sky-600 p-2 rotate-[20deg]  "
            src="https://friendkit.cssninja.io/assets/img/vector/logo/friendkit-white.svg"
          />
          <AvatarFallback>CN</AvatarFallback>

          <input type="file" className="hidden" id="Avatar" />
        </Avatar>{" "}
      </div>
    </div>
  );
}
