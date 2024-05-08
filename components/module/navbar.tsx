import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link className="flex justify-center items-start gap-1" href={'/'}>
        <p className="font-extrabold text-[26px] max-sm:hidden">Yoom</p>
        <Image width={32} height={32} className="max-sm:size-10" alt="main logo" src={'/icons/logo.svg'}/>
      </Link>
      <div className="flex-between gap-5">
        {/* clerk user managment */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar;