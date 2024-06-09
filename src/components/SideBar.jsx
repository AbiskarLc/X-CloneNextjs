"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

const SideBar = () => {

  const {data} = useSession();

  return (
    <div className=' flex flex-col items-center sm:items-start p-3  gap-4'>
        <Link href={"/"}>
            <FaXTwitter className=' w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-100'/>
        </Link>
        <Link href={"/"} className=' w-fit sm:w-auto sm:flex sm:items-center  sm:gap-2 hover:bg-gray-200 p-1 rounded-xl'>
           <HiHome className='text-2xl sm:text-xl' />
           <span className=' hidden sm:inline'>Home</span>
        </Link>
       {
        data?<button className='hidden sm:inline items-center  w-36 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md'
        onClick={()=> signOut()}>Sign Out</button>: 
        <button className='hidden sm:inline items-center  w-36 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md'
        onClick={()=> signIn()}>Sign In</button>
       } 
       
        
    </div>
  )
}

export default SideBar