import Image from "next/image";

export default function NoPosts() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[600px] h-80 relative animate-pulse">
        <Image src="/1.svg" alt="Img" fill />
      </div>
      <h1 className=" text-xl font-semibold my-2 ">
        There are currently no posts
      </h1>
      <p className="text-base dark:text-gray-300 text-gray-500  px-[50px] text-center">
        Too bad. It seems that no one has posted yet. But dont worry, that
        should start anytime soon.
      </p>
    </div>
  );
}
