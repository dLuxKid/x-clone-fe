"use client";

import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useMemo } from "react";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export default function LeftSidebarMenu() {
  const { user } = useAuthContext();

  const navigation_items = useMemo(
    () => [
      { title: "", icon: FaXTwitter, url: "" },
      { title: "Home", icon: BiHomeCircle, url: "/home" },
      { title: "Explore", icon: CiSearch, url: "/explore" },
      { title: "Notifications", icon: BsBell, url: "/notifications" },
      { title: "Messages", icon: BsEnvelope, url: "/messages" },
      { title: "Bookmarks", icon: BsBookmark, url: "/bookmarks" },
      {
        title: "Profile",
        icon: BiUser,
        url: user ? `/users/${user.username}` : "/login",
      },
    ],
    [user]
  );

  return (
    <>
      {navigation_items.map((item, i) => (
        <Link
          href={item.url}
          key={i}
          className="hover:bg-white/10 transition duration-200 rounded-3xl py-2 px-4 flex items-center justify-start w-fit space-x-2 text-xl"
          aria-label={item.title}
        >
          <span>
            <item.icon className="h-5 w-5 md:h-7 md:w-7" />
          </span>
          {item.title && <p>{item.title}</p>}
        </Link>
      ))}
    </>
  );
}
