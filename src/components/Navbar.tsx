'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User

  return (
    <nav className="p-4 md:p-6 shadow-md bg-teal-700 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          TrueLoop
        </Link>
        {session ? (
          <div>
            <span className="mr-4 text-3xl">
              Welcome, <span className='capitalize'>{user?.username || user?.email}</span>
            </span>
            <Link href='/dashboard'>
              <Button className="w-full md:w-auto bg-slate-100 text-black mr-1" variant='outline'>
                Dashboard
              </Button>
            </Link>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;