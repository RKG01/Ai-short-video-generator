import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function EmptyState() {
  return (
    <div className='border-dotted mt-10 flex flex-col items-center justify-center p-10 py-24 border-2 border-gray-300 rounded-lg'>
      <h2>you don't have any short video created.</h2>
      <Link href={'/dashboard/create-new'}>
      <Button>Create new short Video</Button>
      </Link>
    </div>
  )
}
