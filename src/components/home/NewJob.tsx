import { Briefcase, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";

export default function NewJob() {
  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ x: 100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      className="lg:flex hidden flex-col bg-sky-600 py-6 text-center  rounded-xl w-full bg-[url(https://friendkit.cssninja.io/assets/img/illustrations/cards/job-bg.svg)] bg-no-repeat bg-cover bg-center mx-auto justify-center text-slate-100 px-4  "
    >
      <div className="py-2 flex items-center justify-between w-full ">
        <Briefcase size={22} className="text-slate-100   " />
        <MoreVertical
          size={18}
          className="text-slate-100  h-9 w-9 p-2 rounded-full   transition-all duration-300 cursor-pointer  hover:bg-slate-700  "
        />
      </div>
      <div className="mx-auto my-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src="/jenna.webp" />
        </Avatar>
      </div>
      <div className="text-sm font-semibold ">Nelly has a new job!</div>
      <p className="text-sm my-2">
        Send her message congratulating her for getting this job.
      </p>
      <button className="px-4 py-2 my-3 text-white border-[1px] rounded-lg border-white hover:text-slate-900 hover:bg-white transition-all duration-300 w-fit text-sm block mx-auto ">
        Write Message{" "}
      </button>
    </motion.div>
  );
}
