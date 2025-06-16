'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'


function Dashboard() {
  const [videoList, setVideolist] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  return (
    <div>

    <div className='justify-between flex items-center p-5'>
      <h2 className='font-bold text-primary text-2xl'>Dashboard</h2>
      <Link href={'/dashboard/create-new'}>
      <Button>+ Create New</Button>
      </Link>
    </div>
    {/*empty state*/}
      {videoList?.length==0&&<div>
     <EmptyState />
    </div>}
    </div>
  )
}

export default Dashboard
