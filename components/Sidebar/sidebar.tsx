'use client';

import { cn } from '@/lib/utils';
import { ArrowLeftRight, LayoutPanelLeft, LucideIcon, Users } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarItem = ({ link, label, icon: Icon }: { link: string, label: string, icon: LucideIcon }) => {

  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className={cn('px-3 py-3 w-full rounded-md text-white/50', isActive && 'bg-accent-green/10 text-white')}>
      <Link href={link} className='flex items-center gap-2'>
        <Icon size={20} />
        <p>{label}</p>
      </Link>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className='p-5 border-r border-zinc-500/20 h-full w-80'>
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
    </div>
  )
}

export default Sidebar