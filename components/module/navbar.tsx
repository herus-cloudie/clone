import MobileNav from "./mobileNav";
import HomeLogo from "./homeLogo";
import {SignedIn, UserButton } from "@clerk/nextjs";
import FriendsSheet from "./friendsSheet";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <HomeLogo />
      <div className="flex-between gap-5">
        <FriendsSheet />
        <div className="hidden sm:flex sm:ml-2 ml-0 lg:ml-0">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar;