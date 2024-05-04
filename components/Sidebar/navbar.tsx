'use client'

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className='flex items-center justify-between h-20 border-b border-zinc-500/20 mx-10 fixed left-0 right-0 top-0 bg-transparent z-10'>
      <div className='flex-1'>
        <Image src={'/waallet.svg'} alt='waallet' width={200} height={50} className='h-10 w-auto' />
      </div>
      <ul className='flex flex-1 items-center justify-center gap-8'>
        <li className='text-white/50 hover:text-white p-1'><Link href='/'>Features</Link></li>
        <li className='text-white/50 hover:text-white p-1'><Link href='/'>About</Link></li>
        <li className='text-white/50 hover:text-white p-1'><Link href='/'>Resources</Link></li>
      </ul>
      <div className='flex flex-1 items-center justify-end gap-8'>
        {isSignedIn ?
          < Link href='/dashboard'>
            <Button size="lg">Dashboard</Button>
          </Link>
          : <>
            < Link href='/sign-in'>
              <Button size="lg" variant="outline">Sign in</Button>
            </Link>
            <Link href='/sign-up'>
              <Button size="lg">Sign up</Button>
            </Link>
          </>}
      </div >
    </div >
  )
}

export default Navbar