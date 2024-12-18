import { SignedIn } from "@clerk/nextjs";
import {
  ActivityLogIcon,
  HomeIcon,
  ImageIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div className="flex flex-row ">
      <div className=" flex flex-row justify-center items-center gap-2 ml-0 sm:gap-8 md:gap-12 lg:gap-28 text-white w-72 text-[10px] md:text-lg sm:w-100% md:w-100%">
        <Link
          className="w-18 sm:w-20 md:w-28 h-12 sm:h-[103px] py-9  m-0 p-2 gap-1 sm:gap-2 flex flex-row justify-center items-center hover:bg-neutral-800"
          href="/"
        >
          Home
          <HomeIcon className="w-3 md:w-5" />
        </Link>

        <Link
          className="w-18 sm:w-20 md:w-28 h-12 sm:h-[103px] py-9 p-2 hover:bg-neutral-800 flex flex-row justify-center items-center"
          href={"/create"}
        >
          Create
          <ImageIcon className="w-2 sm:w-10" />
        </Link>
        <Link
          className=" w-18 sm:w-20 md:w-28 h-12 sm:h-[103px] py-9 m-0 p-2 gap-1 sm:gap-2 flex flex-row justify-center items-center hover:bg-neutral-800"
          href={"/posts"}
        >
          Posts <ActivityLogIcon className="w-2 sm:w-10" />
        </Link>
        <SignedIn>
          <Link
            className="w-18 sm:w-20 md:w-28 h-12 sm:h-[103px] py-5 m-0 p-2 gap-1 sm:gap-2 flex flex-row justify-center items-center hover:bg-neutral-800"
            href={"/users"}
          >
            User Profile <PersonIcon className="w-3 sm:w-10 " />
          </Link>
        </SignedIn>
        <Link
          className=" w-18 sm:w-20 md:w-28 h-12 sm:h-[103px] py-9 m-0 p-2 gap-1  sm:gap-2 flex flex-row justify-center items-center hover:bg-neutral-800"
          href="/about"
        >
          About
          <QuestionMarkCircledIcon className="w-3 sm:w-5" />
        </Link>
      </div>
    </div>
  );
}
