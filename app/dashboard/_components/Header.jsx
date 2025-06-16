import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className='flex justify-between items-center bg-gray-500 text-black px-5 shadow-md '>
       <div className='flex items-center gap-3'>
        <Image
          src="/image/image.png"
          alt="Logo"
          width={30}
          height={30}/>
          <h2>AI Vid</h2>
       </div>

       <div className='flex items-center gap-4  text-white'>
             <Button>Dashboard</Button>
            <UserButton/>
       </div>
    </div>
  )
}
