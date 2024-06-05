'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';

function Sidebar() {
  let pathName = usePathname();
  return (
    <section className={`max-sm:hidden  bg-dark-1 sticky top-0 right-0 w-fit h-screen flex flex-col justify-between p-0 pt-16 sm:p-6 text-white lg:w-[264px]`}>
      <div className='flex flex-1 flex-col gap-6 sm:pt-20'>
        {sidebarLinks.map(item => {
          const isActive = pathName == item.route;
          return (
            <Link style={{borderRadius : '5px'}} href={item.route} key={item.label} className={cn('flex gap-4 items-center p-4 justify-start' , {'bg-blue-1':isActive})}>
              <Image alt={item.label} src={item.imageUrl} width={24} height={24}/>
              <p className={`max-lg:hidden text-lg font-semibold`}>{item.label}</p>
            </Link>
            )
        }
        )}
      </div>
    </section>
  )
}

export default Sidebar;