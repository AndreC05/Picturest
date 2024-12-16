import {
  ActivityLogIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <div className="flex flex-row justify-center items-center gap-48 bg-black text-white w-screen">
      <Link className="p-5" href="/">
        Home
        <HomeIcon />
      </Link>

      <Link className="p-6" href={'/create'}>
        Create
      </Link>
      <Link className="p-5" href={'/posts'}>
        Posts <ActivityLogIcon />{' '}
      </Link>
      <Link className="p-5" href={'/users'}>
        User Profile
      </Link>
      <Link className="p-5" href="/about">
        About
        <QuestionMarkCircledIcon />
      </Link>
    </div>
  );
}
