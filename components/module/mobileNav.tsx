'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import HomeLogo from "./homeLogo"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"


const MobileNav = () => {
  let pathName = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image width={36} height={36} className="sm:hidden cursor-pointer" alt="hamburger menu" src={'/icons/hamburger.svg'}/>
      </SheetTrigger>
      <SheetContent className="bg-dark-2 border-none text-white">
        <HomeLogo forMobileNav={true}/>
        <div className='flex flex-1 flex-col gap-6 sm:pt-20 pt-10'>
          {sidebarLinks.map(item => {
            const isActive = pathName == item.route;
            return (
                <SheetClose key={item.label} asChild>
                  <Link style={{borderRadius : '5px'}} href={item.route} key={item.label} className={cn('flex gap-4 items-center p-4 w-full max-w-60' , {'bg-blue-1':isActive})}>
                    <Image alt={item.label} src={item.imageUrl} width={20} height={20}/>
                    <p className={`font-semibold`}>{item.label}</p>
                  </Link>
                </SheetClose>
              )
          }
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav;