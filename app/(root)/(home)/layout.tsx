
import { Navbar , Sidebar } from '@/components/module'
import { Toaster } from "@/components/ui/toaster";

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        <div className='flex'>
        <Sidebar />
        <section className='flex  flex-1 flex-col min-h-screen px-6 pb-6 mt-28 max-md:pb-14 sm:px-14'>
            <div className='w-full'>
            {children}
            </div>
        </section>
        </div>
        <Toaster />
    </div>
  )
}

export default HomeLayout