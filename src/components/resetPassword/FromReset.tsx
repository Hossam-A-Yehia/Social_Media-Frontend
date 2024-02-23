"use client";
import { Check, Lock, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FromReset() {
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
    newPassword: "",
    secretAnswer: "",
    secretQue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.info(data.message);
        push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex relative">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full  bg-white dark:bg-slate-800 flex items-center justify-center flex-col pt-4">
        <Avatar className="size-[130px] overflow-visible   mx-auto border-[3px] dark:border-gray-500  border-gray-200 p-2 relative">
          <AvatarImage className=" rounded-full " src="/3551739.jpg" />
          <AvatarFallback>CN</AvatarFallback>
          <label htmlFor="Avatar">
            <Check
              className=" absolute z-[100] right-0 top-0 bg-green-400 rounded-full  p-2 text-white  cursor-pointer font-bold size-[35px] "
              strokeWidth={4}
            />
          </label>
        </Avatar>{" "}
        <h1 className="mt-3 mb-2 text-2xl font-semibold">
          Forgot Your Password
        </h1>
        <p className="">
          No worries! Enter your correct secret answer and write new password.
        </p>
        <form action="" className="w-full pt-3 md:w-[400px] mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <User size={20} color="gray" />
            </div>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
              placeholder=" Email"
            />
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Lock size={20} color="gray" />
            </div>
            <input
              onChange={handleChange}
              name="newPassword"
              type="password"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
              placeholder="New password"
            />
          </div>
          <div className="relative mb-6">
            <select
              name="secretQue"
              onChange={handleChange as any}
              id="default"
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            >
              <option value={""} hidden>
                Choose your security question
              </option>
              <option
                className="font-bold"
                value="what is your favourite color"
              >
                What is your favourite color?
              </option>
              <option
                className="font-bold"
                value="What is your best frient name"
              >
                What is your best frient name?
              </option>
              <option className="font-bold" value="What is you were born">
                What is you were born?
              </option>
            </select>
          </div>
          <div className="relative mb-6">
            <div className="mb-5">
              <input
                name="secretAnswer"
                onChange={handleChange}
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                placeholder="Enter your secret answer"
                required
              />
            </div>
          </div>
          <button
            onClick={() => handleResetPassword()}
            type="button"
            className="text-white bg-sky-600 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full duration-300"
          >
            Reset pasword
          </button>
        </form>
        <Link
          href="/login"
          className="text-sky-400 hover:text-sky-500 duration-300 transition-all"
        >
          login
        </Link>
      </div>
      <div className="w-1/3 lg:w-1/2 h-full  bg-sky-600 md:flex items-center justify-center hidden ">
        <Image
          src="/undraw_forgot_password_re_hxwm.svg"
          height={500}
          width={500}
          alt=""
        />
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
