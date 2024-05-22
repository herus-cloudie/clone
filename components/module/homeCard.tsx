'use client'

import Image from "next/image"

import { HomeCardProps } from "@/constants/types"

const HomeCard = ({title , ClassName , icon , description , handleClick } : HomeCardProps) => {

  return (
    <div dir="rtl" onClick={handleClick} className= {`${ClassName} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] h-[100px] sm:min-h-[240px] rounded-[14px] cursor-pointer`}>
        <div className="flex justify-end">
           <div className="flex-center glassmorphism size-12 rounded-[10px]">
              <Image alt={`${title} icon`} src={icon} height={27} width={27}/>
            </div>
        </div>
        <div className="flex flex-col gap-2 -mt-14">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-lg font-normal">{description}</p>
        </div>
   </div>
  )
}

export default HomeCard