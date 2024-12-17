import React from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex flex-row bg-black  w-96 h-12 sm:h-[103px] sm:w-svw md:w-screen ">
      <Image className="w-12 sm:w-24 md:w-32 lg:w-56 h-12 sm:h-[103px]"
        width={150}
        height={100}
        src="/images/picturest.jpg"
        alt="Logo pic"
      />
      <div className="flex flex-row  justify-center items-center pl-5 sm:pl-[150px] md:pl-[180px] lg:pl-[350px] bg-black ">
        <NavBar />
      </div>
      
    </div>
  );
}
