'use client'

import { useEffect } from "react";

import { useConnectedUser } from "@stream-io/video-react-sdk";

import { DateInIran, LongDynamicTime, TimeInIran } from "@/constants/time";
import { MeetingTypeList } from "@/components/module";

const Home = () => {
    const connectedUser = useConnectedUser();

    useEffect(() => {
      const addUserFunction = async () => {
        const seeStatus = await fetch('/api/saveUsers' , {
          method : 'POST',
          body : JSON.stringify(connectedUser),
          headers : {'Content-Type': 'application/json'}
        })
      }

      if(connectedUser) addUserFunction();
    } , [connectedUser])
    
    return (
      <section dir="ltr" className='flex size-full flex-col gap-10'>
        <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11">
            <div className="flex justify-end"><h2 dir="rtl" className="flex pr-4 glassmorphism min-w-[200px] max-w-[270px] rounded py-2 text-center text-base">جلسه پیش رو : ۱۲:۳۰ روز </h2></div>
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-extrabold lg:text-7xl"> {TimeInIran()} </h1>
              <div className="flex flex-row justify-start items-center mt-5">
                <p className="text-sky-1 text-lg font-medium lg:text-2xl mr-16">{DateInIran()}</p>
                <p className="text-sky-1 text-lg font-medium lg:text-2xl">{LongDynamicTime({timeZone : 'en-US' , time : new Date()})}</p>
              </div>
            </div>
          </div>
        </div>  
        <MeetingTypeList />
      </section>
    )
}

export default Home;