"use client"
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { useState } from "react";
const SideBarMainComp = () => {

  return (
    <>

          <div className={` hidden sm:flex sticky top-0 left-0 flex-col items-center justify-between p-3 h-screen border-r-2`}>
            <SideBar />
          </div>
    </>
  )
}

export default SideBarMainComp