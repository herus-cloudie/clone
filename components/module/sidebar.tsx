'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constans';

import { cn } from '@/lib/utils';

function Sidebar() {
  let pathName = usePathname();

  return (
    <section className='sticky top-0 right-0 w-fit h-screen flex flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map(item => {
          const isActive = pathName == item.route;
          return (
            <Link style={{borderRadius : '5px'}} href={item.route} key={item.label} className={cn('flex gap-4 items-center p-4 justify-start' , {'bg-blue-1':isActive})}>
              <Image alt={item.label} src={item.imageUrl} width={24} height={24}/>
              <p className='text-lg font-semibold max-lg:hidden'>{item.label}</p>
            </Link>
        )
        }
        )}
      </div>
    </section>
  )
}

export default Sidebar;