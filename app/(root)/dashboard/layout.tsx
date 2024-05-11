import {Navbar , Sidebar} from '@/components/module'

const LayoutHome = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='flex  flex-1 flex-col min-h-screen px-6 pb-6 mt-28 max-md:pb-14 sm:px-14'>
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>
        
    </main>
  )
}

export default LayoutHome