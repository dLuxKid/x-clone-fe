"use client";

import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import black from "@/assets/black.jpeg";
import pfp from "@/assets/default-pfp.png";
import { useAuthContext } from "@/context/AuthContext";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineInsertLink } from "react-icons/md";
import { PiBalloonLight } from "react-icons/pi";
import { IoCalendarSharp } from "react-icons/io5";
import dayjs from "dayjs";
import { useState } from "react";
import EditProfile from "./edit-profile";

export default function ProfilePage({
  user: fetchedUser,
}: {
  user: userType & { createdAt: Date };
}) {
  const { user } = useAuthContext();

  const [selectedTab, setSelectedTab] = useState("Posts");

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
          layout="fill"
          priority
          className="w-full h-full object-fill"
        />
      </div>
      <div className="px-6 py-2 relative z-10 flex flex-col gap-4">
        <div className="-mt-16 flex justify-between gap-8">
          <Image
            src={fetchedUser?.profile_picture || pfp}
            alt="profile picture"
            width={128}
            height={128}
            priority
            className={`rounded-full h-32 w-32 object-fill border-[3px] border-black object-center`}
          />
          {user?._id === fetchedUser._id ? (
            <EditProfile user={fetchedUser} />
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
        <div className="w-full pt-2">
          <p className="font-normal text-sm md:text-base text-white whitespace-pre-line">
            {fetchedUser?.bio || "user bio goes here"}
          </p>
        </div>
        <div className="w-full flex items-center justify-start flex-wrap gap-2 text-gray-500">
          {fetchedUser?.location && (
            <p className="flex gap-1 md:gap-2 items-center justify-center font-xs md:font-sm">
              <CiLocationOn className="text-sm" /> {fetchedUser.location}
            </p>
          )}
          {fetchedUser?.profile_url && (
            <p className="flex gap-1 md:gap-2 items-center justify-center font-xs md:font-sm">
              <MdOutlineInsertLink className="text-sm" />
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={
                  fetchedUser.profile_url.startsWith("http://") ||
                  fetchedUser.profile_url.startsWith("https://")
                    ? fetchedUser.profile_url
                    : `https://${fetchedUser.profile_url}`
                }
                className="text-blue-pry"
              >
                {fetchedUser.profile_url}
              </a>
            </p>
          )}
          {fetchedUser?.dob && (
            <p className="flex gap-1 md:gap-2 items-center justify-center font-xs md:font-sm">
              <PiBalloonLight className="text-sm" />{" "}
              {dayjs(new Date(fetchedUser.dob)).format("MMMM DD")}
            </p>
          )}

          <p className="flex gap-1 md:gap-2 items-center justify-center font-xs md:font-sm">
            <IoCalendarSharp className="text-sm" /> Joined{" "}
            {dayjs(fetchedUser.createdAt).format("DD MMMM")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <h3 className="font-base md:font-lg font-bold">100</h3>
            <p className="font-xs md:font-sm text-gray-500">Following</p>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="font-base md:font-lg font-bold">1000</h3>
            <p className="font-xs md:font-sm text-gray-500">Followers</p>
          </div>
        </div>
      </div>
      <div className="w-full flex border-b border-b-gray-500">
        {["Posts", "Replies", "Media"].map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedTab(item)}
            className="cursor-pointer px-6 pt-3 hover:bg-white/10 flex-1 flex justify-center items-center"
          >
            <div className="flex flex-col gap-3 items-center">
              <p
                className={`${
                  item === selectedTab
                    ? "text-white font-bold"
                    : "text-gray-500 font-normal"
                } text-base md:text-lg px-2`}
              >
                {item}
              </p>
              <span
                className={`h-1 w-full mb-0.5 rounded-sm ${
                  selectedTab === item ? "bg-blue-pry" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
