"use client";

import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import black from "@/assets/black.jpeg";
import pfp from "@/assets/default-pfp.png";
import { useAuthContext } from "@/context/AuthContext";

export default function ProfilePage({ user: fetchedUser }: { user: userType }) {
  const { user } = useAuthContext();

  return (
    <main className="min-h-screen w-full max-w-2xl flex flex-col border-x-[0.5px] border-gray-500 text-white mx-auto">
      <div className="px-4 py-0.5 w-full flex items-center justify-start gap-4 border-b-gray-500 border-b">
        <div
          title="go back"
          className="flex items-center justify-center my-auto p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200"
        >
          <IoMdArrowRoundBack className="text-lg md:text-xl" />
        </div>
        <div className="h-full flex gap-1 flex-col justify-between text-white">
          <h4 className="text-base sm:text-lg md:text-xl font-semibold">
            {fetchedUser?.displayname}
          </h4>
          <p className="text-sm md:text-base font-normal">300 posts</p>
        </div>
      </div>
      <div className="h-48 w-full relative overflow-hidden">
        <Image
          src={fetchedUser.banner_picture || black}
          alt="banner picture"
          className="w-full h-full object-fill"
        />
      </div>
      <div className="px-6 py-2 relative z-10 flex flex-col gap-4">
        <div className="-mt-16 flex justify-between gap-8">
          <Image
            src={fetchedUser?.profile_picture || pfp}
            alt="profile picture"
            className={`rounded-full h-32 w-32 object-fill border-[3px] border-black object-center`}
          />
          {user?._id === fetchedUser._id ? (
            <button
              title="edit profile"
              aria-label="edit profile"
              type="button"
              className="self-end border-white border rounded-3xl px-6 py-1.5 bg-transparent text-white font-medium text-base md:text-lg mb-4"
            >
              Edit profile
            </button>
          ) : (
            <button
              title="follow"
              aria-label="follow"
              type="button"
              className="self-end bg-white rounded-3xl px-6 py-1.5 bg-transparent text-black font-medium text-base md:text-lg mb-4"
            >
              Follow
            </button>
          )}
        </div>
        <div className="h-full flex flex-col justify-between text-white">
          <h1 className="text-base sm:text-lg md:text-xl font-bold">
            {fetchedUser?.displayname}
          </h1>
          <h4 className="text-sm md:text-base text-gray-500 font-medium">
            @{fetchedUser.username}
          </h4>
        </div>
      </div>
    </main>
  );
}
