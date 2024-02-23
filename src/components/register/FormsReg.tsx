"use client";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function FormsReg() {
  const [file, setFile] = useState<string>("");
  const [image, setImage] = useState("");

  const { push } = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: 0,
    photo: "",
    password: "",
    secretAnswer: "",
    secretQue: "",
  });
  const [prog, setProg] = useState<string | "0%">("0%");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, photo: image }),
      });
      if (res.status === 201) {
        const data = await res.json();
        toast.info("Successfully, Now you can login ");
        push("/login");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
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
  console.log(file, image);

  return (
    <>
      <div className="bg-gray-200 dark:bg-slate-800 min-h-[calc(100vh-66px)] pt-[50px] overflow-hidden">
        <ProgressBar prog={prog} />
        {prog === "0%" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <div>
              <h3 className="text-xl my-7  font-semibold tracking-wide text-center text-slate-700 mb-3 dark:text-slate-100">
                Tell us more about you
              </h3>
              <form className=" w-[280px] sm:w-[350px] md:w-[500px]   mx-auto bg-white dark:bg-slate-900 px-10 py-6 rounded-lg">
                <div className="mb-5">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    full name
                  </label>
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    type="text"
                    id="fullname"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                    placeholder="Hossam Yehia"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={user.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                    placeholder="EreYehia@flowbite.com"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    value={user.phone}
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    id="phone"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                    placeholder="2013267489"
                    required
                  />
                </div>
              </form>
              <div className="flex items-center  w-[280px] sm:w-[350px] md:w-[500px]   mt-3 justify-end   mx-auto">
                <button
                  onClick={() => setProg("33.33%")}
                  type="button"
                  className="text-sky-600 hover:text-white border border-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {prog === "33.33%" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <h3 className="text-xl my-7  font-semibold tracking-wide text-center text-slate-700 mb-3 dark:text-slate-100">
              Upload a profile picture.
            </h3>
            <form className="  w-[280px] sm:w-[350px] md:w-[500px]  mx-auto bg-white px-10 py-6 rounded-lg dark:bg-slate-900">
              <div className=" my-7 text-center ">
                <Avatar className="size-[130px] overflow-visible   mx-auto border-[3px]  border-gray-200 p-2 relative">
                  {image ? (
                    <AvatarImage className=" rounded-full " src={image} />
                  ) : (
                    <AvatarImage
                      className=" rounded-full object-fill "
                      src="/avatar-w.webp"
                    />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                  <label htmlFor="Avatar">
                    <Plus className=" absolute z-[100] right-0 top-0 bg-gray-400 rounded-full size-8 p-2 text-white transition-all duration-300 hover:bg-sky-600  hover:text-white cursor-pointer  " />
                  </label>

                  <input
                    type="file"
                    className="hidden"
                    id="Avatar"
                    onChange={handleFileChange}
                  />
                </Avatar>{" "}
                <p className=" text-sm mt-5 text-gray-500">
                  Only images with a size lower than 3MB are allowed.
                </p>
              </div>
            </form>

            <div className="flex items-center  w-[280px] sm:w-[350px] md:w-[500px]  mt-3 justify-end gap-2   mx-auto">
              <button
                onClick={() => setProg("0%")}
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 transition-all duration-300 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Back
              </button>

              <button
                onClick={() => setProg("67%")}
                type="button"
                className="text-sky-600 hover:text-white border border-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
        {prog === "67%" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <h3 className="text-xl my-7  font-semibold tracking-wide text-center text-slate-700 mb-3 dark:text-slate-100">
              Secure your account.
            </h3>
            <form className="  w-[280px] sm:w-[350px] md:w-[500px]  mx-auto bg-white px-10 py-6 rounded-lg dark:bg-slate-900">
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                  placeholder="Choose a password"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="default"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  You can use this to reset your password
                </label>
                <select
                  value={user.secretQue}
                  name="secretQue"
                  onChange={handleChange as any}
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option value={""} hidden>
                    Pick a question
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
              {user.secretQue !== "" && (
                <div className="mb-5">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your answer
                  </label>
                  <input
                    value={user.secretAnswer}
                    name="secretAnswer"
                    onChange={handleChange}
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light transition-all duration-500"
                    placeholder="Enter your answer"
                    required
                  />
                </div>
              )}
            </form>
            <div className="flex items-center  w-[280px] sm:w-[350px] md:w-[500px]  mt-3 justify-end gap-2   mx-auto">
              <button
                onClick={() => setProg("33.33%")}
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 transition-all duration-300 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Back
              </button>

              <button
                onClick={() => setProg("100%")}
                type="button"
                className="text-sky-600 hover:text-white border border-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
        {prog === "100%" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 7,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <h3 className="text-xl my-7  font-semibold tracking-wide text-center text-slate-700 mb-3 dark:text-slate-100">
              You're all set. Ready?
            </h3>
            <div className=" w-[280px] sm:w-[350px] md:w-[500px]  mx-auto bg-white px-2 md:px-[60px] py-6 rounded-lg text-center dark:bg-slate-900">
              <Image
                src="/mailbox.svg"
                width={150}
                height={150}
                alt="IMG"
                className="text-center mx-auto size-20"
              />
              <div className="my-3 text-base font-semibold md:whitespace-nowrap">
                Congratz, you successfully created your account.
              </div>
              <p className="text-gray-400 text-sm leading-6 ">
                We just sent you a confirmation email. PLease confirm your
                account within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => handleRegister()}
                className="text-sky-600 hover:text-white border border-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition-all duration-500 mt-2 w-full"
              >
                Let Me In
              </button>
            </div>
            <div className="flex items-center w-[280px] sm:w-[350px] md:w-[500px]  mt-3 justify-end gap-2   mx-auto">
              <button
                onClick={() => setProg("67%")}
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 transition-all duration-300 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
        <div className="text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-sky-400 hover:text-sky-500 duration-300 transition-all"
          >
            Login now
          </Link>
        </div>
      </div>
    </>
  );
}
export default FormsReg;
