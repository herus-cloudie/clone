import Image from 'next/image'
import Link from 'next/link'

const HomeLogo = ({ClassName} : { ClassName ?: string}) => {
  return (
    <Link className={`flex justify-end items-center  sm:items-start sm:justify-center gap-1`} href={'/'}>
        <p className={`${ClassName} font-extrabold text-[26px]`}>Yoom</p>
        <Image width={32} height={32} className="max-sm:size-10" alt="main logo" src={'/icons/logo.svg'}/>
    </Link>
  )
}

export default HomeLogo