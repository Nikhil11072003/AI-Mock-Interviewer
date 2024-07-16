"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {

    const path=usePathname();
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md' >
        <Image src={'/logo.svg'} width={160} height={100}/>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold font-medium transition-all cursor-pointer ${path=='/dashboard'&&'text-primary'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold font-medium transition-all cursor-pointer ${path=='/dashboard/qustions'&&'text-primary'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold font-medium transition-all cursor-pointer ${path=='/dashboard/updrade'&&'text-primary'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold font-medium transition-all cursor-pointer ${path=='/dashboard/how'&&'text-primary'}`}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header