'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const Nav = () => {
  const { data, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    // if (status === 'unauthenticated') {
    //   router.push('/signin');
    // }
  }, [status]);

  return (
    <>
    <nav className='flex w-full rounded-md justify-between items-center h-16 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg font-mono'>
      <h1 className='text-xl font-bold'>Task Manager</h1>
      <div className='flex items-center gap-4'>
        {status === 'authenticated' ? (
          <>
            <span className='text-sm'>Welcome, {data?.user?.name}</span>
            <Button
              onClick={() => signOut()}
              className='bg-white text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-all'>Sign Out</Button>
          </>
      ) : (
      <Button className='bg-white text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-all' onClick={() => router.push('/signin')}>
        Sign In
      </Button>
        )}
    </div>

    </nav >
    </>

  )
}

export default Nav