import React from 'react';
import NavBar from './NavBar';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <div className='flex flex-row '>
      <Image width={150} height={100} src='/images/picturest.jpg' />
      <NavBar />
      <SignedOut>
            <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
