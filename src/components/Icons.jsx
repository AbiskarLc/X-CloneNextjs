"use client"

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi"

const Icons = () => {
  return (
    <div className=" flex p-2 text-gray-500 gap-2">
        <HiOutlineChat className=" w-8 h-8 transition duration-150 hover:text-sky-600 cursor-pointer ease-in hover:bg-gray-200 rounded-full p-1"/>
        <HiOutlineHeart className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"/>
        <HiOutlineTrash className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"/>
    </div>
  )
}

export default Icons