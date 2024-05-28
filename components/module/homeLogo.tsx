import Image from 'next/image'
import Link from 'next/link'
import {SignedIn, UserButton } from "@clerk/nextjs";

const HomeLogo = ({forMobileNav} : {forMobileNav ?: boolean}) => {
  return (
    <>
      <Link className={`${forMobileNav ? 'flex sm:hidden items-center justify-end' : 'sm:flex hidden items-start justify-center'} gap-1`} href={'/'}>
        <p className={`font-extrabold text-[26px]`}>Yoom</p>
        <Image width={32} height={32} className="max-sm:size-10" alt="main logo" src={'/icons/logo.svg'}/>
      </Link>
        <div className={`${forMobileNav ? 'sm:flex hidden' : 'flex sm:hidden'} max-w-8 max-h-8 ml-10 mr-5 sm:mr-7 sm:ml-0 cursor-pointer sm:hidden flex`}>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </div>
    </>

  )
}

export default HomeLogo;