import { StreamClientProvider } from "@/providers/streamClientProvider";

const LayoutRoot = ({children} : {children : React.ReactNode}) => {

  return (
    <StreamClientProvider>
        <div className='text-white'>
          {children}
        </div>
    </StreamClientProvider>  

  )
}

export default LayoutRoot;