import FormsReg from "@/components/register/FormsReg";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <div className="p-2 dark:bg-slate-900 text-center overflow-hidden">
        <Image
          src="https://friendkit.cssninja.io/assets/img/vector/logo/friendkit-bold.svg"
          width={50}
          height={50}
          alt="LOGO"
          className="mx-auto"
        />
      </div>
      <FormsReg />
    </div>
  );
}
