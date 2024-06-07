'use client';

import Image from "next/image";

import { Call } from "@stream-io/video-react-sdk";

import { LongDynamicTime, TimeInIran } from "@/constants/time";
import { Loader , DynamicBtn } from "@/components/module";

import { useGetCallById } from "@/hooks/useGetCallById";
import {useGetFriendsAndUsers} from "@/hooks/useGetFriendsAndUsers";

const Inviting = () => {
  const {isLoaded , mainUser} = useGetFriendsAndUsers();

  return (
    <section className='flex size-full flex-col gap-10'>
      <h1 className='text-3xl font-bold'>دعوت ها</h1>
      {
        !isLoaded ? <Loader />
        : <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {
              mainUser?.meeting.length === 0 ? <p className="text-xl flex justify-center mt-5">هیچ دعوتی برای دیدار ارسال نشده</p>
              : <div>
                  {mainUser?.meeting.toReversed().map(callId => <CallDetails key={callId} callId={callId} />)}
              </div>
            }
        </div>
      }
    </section>
  );
};

const CallDetails = ({ callId } : {callId : string}) => {
  const { isCallLoaded, call } = useGetCallById(callId);

  if (!isCallLoaded) return null;

  const ownerMeetingImg = call?.state.createdBy?.image;

  return (
    <div className="bg-dark-1 rounded-2xl sm:h-[258px] h-[250px] max-w-[600px] p-5 flex flex-col justify-between mt-5">
      <header className="flex flex-col gap-5 sm:gap-7">
        <Image src="/icons/upcoming.svg" width={25} height={25} alt="upcoming icon" />
        <h3 className="sm:text-2xl text-xl font-semibold">
          {call?.state.custom.description.substring(0, 25) || 'بدون توضیحات'}
        </h3>
        <div dir="ltr" className="text-sm sm:text-base">
          <div className="flex justify-end gap-4">
            <span>{LongDynamicTime({ timeZone: 'fa-IR', time: call?.state.startsAt })}</span>
            <span>ساعت : {TimeInIran(call?.state.startsAt)}</span>
          </div>
        </div>
      </header>
      <footer className="flex w-full">
        <div className="flex w-full justify-between items-center flex-row-reverse mt-7">
          <div className="flex justify-end w-full">
            <div className="w-[80px] h-[35px]">
              <Image className="rounded-full -mr-3 object-contain" src={ownerMeetingImg || ''} alt="avatar" width={35} height={35}/>
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-6">
            <DynamicBtn call={(call as Call)} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inviting;
