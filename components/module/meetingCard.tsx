//@ts-nocheck
'use client'

import { avatarImages } from "@/constants"
import { LongDynamicTime, TimeInIran  } from "@/constants/time";

import { Call, CallRecording  } from "@stream-io/video-react-sdk"

import Image from "next/image"
import { useRouter } from "next/navigation";

import { Button } from "../ui/button"

const MeetingCard = ({call , type} : {call : Call | CallRecording , type : 'previous' | 'upcoming' | 'recording'}) => {

  const router = useRouter();

  return (
    <div className={`bg-dark-1 rounded-2xl ${type != 'previous' ? 'sm:h-[258px] h-[290px]' : 'h-[220px]'} max-w-[600px] p-5 flex flex-col justify-between`}>
      <header className="flex flex-col gap-5 sm:gap-7">
        <Image src={type == 'upcoming' ? '/icons/upcoming.svg' : type == 'previous' ? '/icons/previous.svg' : '/icons/recordings.svg'} width={25} height={25} alt="upcoming icon"/>
        <h3 className="sm:text-2xl text-xl font-semibold">{type != 'recording' ?
         call.state.custom.description.substring(0 , 25) || 'یدون توضیحات' : call.filename.substring(0 , 25)}  </h3>
        <div dir="ltr" className="text-sm sm:text-base">
          {
            type != 'recording' ?
              <div className="flex justify-end gap-4">
                <span>{LongDynamicTime({timeZone : 'fa-IR' , time :  call.state.startsAt} )}</span>
                <span>ساعت : {TimeInIran(call.state.startsAt)}</span>
              </div> 
            : <div className="flex justify-end gap-4">
              <span>اتمام : {TimeInIran(new Date(call.end_time))}</span>
              <span>شروع : {TimeInIran(new Date(call.start_time))}</span>
            </div> 
          }
        </div>
      </header>
      <footer className={`flex w-full ${type == 'previous' ? 'justify-end' : ''}`}>
          {
            type == 'upcoming' ?
              <div className="flex flex-col w-full justify-between items-center sm:flex-row-reverse">
                  <div className="flex justify-end w-full ml-5 sm:ml-0"><Avatars /></div>
                  <div className="flex justify-between items-center w-full sm:w-32 gap-6">
                    <Button onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${id}`)} className="bg-dark-4 w-1/2 sm:w-36 xl:w-32">لینک دعوت<Image alt="copy icons" className="mr-1" src={'/icons/copy.svg'} width={15} height={15}/></Button>
                    <Button onClick={() => router.push(`/meeting/${id}`)} className="bg-blue-1 w-1/2 sm:w-20 z-10">پیوستن</Button>
                  </div>
              </div>
            : type == 'recording' ?
              <div className="flex justify-center w-full gap-2 sm:gap-7">
                  <Button onClick={() => navigator.clipboard.writeText(call.url)} className="bg-dark-4 w-1/2 flex items-center">همرسانی<Image alt="copy icons" className="mr-1" src={'/icons/share.svg'} width={15} height={15}/></Button>
                  <Button onClick={() => router.push(call.url)} className="bg-blue-1 w-1/2 flex items-center">پخش<Image alt="copy icons" className="mr-1" src={'/icons/play.svg'} width={10} height={10}/></Button>
              </div>
            : <Avatars type="previous"/>
          }
      </footer>
    </div>
  )
}

export const Avatars = ({type} : {type ?: 'previous'}) => {
  return(
    <div className={`w-[170px] h-[35px] flex sm:-ml-10 ${type ? '-ml-8' : 'mb-8 sm:mb-0 -ml-16'}`}>
        {
          avatarImages.map((img , index) => <Image key={index} className="rounded-full -mr-3" src={img} alt="avatar image" width={35} height={35}/>)
        }
    </div>
  )
}
export default MeetingCard;