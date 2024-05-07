'use client';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeftRight, LayoutPanelLeft, LucideIcon, Users } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useUser } from '@clerk/nextjs';

const SidebarItem = ({ link, label, icon: Icon }: { link: string, label: string, icon: LucideIcon }) => {

  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className={cn('w-full rounded-md text-white/50', isActive && 'bg-off-black text-white')}>
      <Link href={link} className='px-3 py-3 flex items-center gap-2'>
        <Icon size={20} />
        <p>{label}</p>
      </Link>
    </div>
  )
}

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className='p-5 border-r border-zinc-500/20 h-full flex flex-col w-80'>
      <div className=''>
        <Image
          src={'/waallet.svg'}
          alt='waallet'
          width={200}
          height={50}
          className='h-10 w-auto'
        />
      </div>

      <div className='flex flex-col items-start mt-10'>
        <SidebarItem label='Dashboard' link='/dashboard' icon={LayoutPanelLeft} />
        <SidebarItem label='Transactions' link='/transactions' icon={ArrowLeftRight} />
        <SidebarItem label='Manage' link='/manage' icon={Users} />
      </div>

      <div className='mt-auto'>
        <div className='flex gap-2'>
          <UserButton appearance={{
            elements: {
              userButtonTrigger: {
                borderRadius: "0.375rem",
                padding: "0"
              },
              avatarBox: {
                width: "40px",
                height: "40px",
                borderRadius: "0.375rem"
              },
            }
          }} />
          <div className='flex flex-col h-full justify-between'>
            <p className='text-sm'>{user?.fullName}</p>
            <p className='text-xs text-zinc-500'>{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar