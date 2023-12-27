"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Buttons = () => {
   const {data,status,update} =  useSession()
   console.log(data,status,update);
   
  return (
    <div className='flex flex-col gap-2'>
      <Button onClick={() => signOut()} variant={"destructive"} size={"lg"}>
        Logout
      </Button>
      <Button asChild variant={"destructive"} size={"lg"}>
        <Link href={"/api/auth/signin"}>Login</Link>
      </Button>
    </div>
  )
}

export default Buttons
