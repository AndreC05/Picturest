import {
  HomeIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <div>
      <Link href="/">
        Home
        <HomeIcon />
      </Link>
      <Link href="/about">
        About
        <QuestionMarkCircledIcon />
      </Link>
    </div>
  );
}
