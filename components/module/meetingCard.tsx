//@ts-nocheck
'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { LongDynamicTime, TimeInIran } from "@/constants/time";

import { Call, CallRecording } from "@stream-io/video-react-sdk";

import { Button } from "../ui/button";

import DynamicBtn from "./dynamicBtn";

import SendMeetingRequest from "./sendMeetingRequest";

const MeetingCard = ({ call, type }: { call: Call | CallRecording, type: 'previous' | 'upcoming' | 'recording' }) => {
  const router = useRouter();

  const [CallsInfo, setCallsInfo] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPreviousCalls = async () => {
      const response = await fetch('/api/saveCallsMember');
      const { allCall } = await response.json();
      setCallsInfo(allCall);
    };

    fetchPreviousCalls();
  }, []);

  const matchData = CallsInfo?.find(prevCall => prevCall.callId === call.id)?.users.map(user => user.image);

  return (
    <div className={`bg-dark-1 rounded-2xl ${type !== 'previous' ? 'sm:h-[258px] h-[290px]' : 'h-[220px]'} max-w-[600px] p-5 flex flex-col justify-between`}>
      <header className="flex flex-col gap-5 sm:gap-7">
        <Image src={`/icons/${type}.svg`} width={25} height={25} alt={`${type} icon`} />
        <h3 className="sm:text-2xl text-xl font-semibold">
          {type !== 'recording' ? call.state.custom.description.substring(0, 25) || 'بدون توضیحات' : call.filename.substring(0, 25)}
        </h3>
        <div dir="ltr" className="text-sm sm:text-base">
          {type !== 'recording' ? (
            <div className="flex justify-end gap-4">
              <span>{LongDynamicTime({ timeZone: 'fa-IR', time: call.state.startsAt })}</span>
              <span>ساعت : {TimeInIran(call.state.startsAt)}</span>
            </div>
          ) : (
            <div className="flex items-end gap-4 flex-col sm:flex-row sm:justify-end">
              <span dir="rtl">{LongDynamicTime({ timeZone: 'fa-IR', time: new Date(call.start_time) })}</span>
              <span>
                <span>اتمام : {TimeInIran(new Date(call.end_time))}</span>
                <span>شروع : {TimeInIran(new Date(call.start_time))}</span>
              </span>
            </div>
          )}
        </div>
      </header>
      <footer className={`flex w-full ${type === 'previous' ? 'justify-end' : ''}`}>
        {type === 'upcoming' ? (
          <div className="flex flex-col w-full justify-between items-center sm:flex-row-reverse">
            <div className="flex justify-end w-full ml-5 sm:ml-0"><Avatars matchData={matchData} /></div>
            <div className="flex justify-between items-center w-full sm:w-32 gap-6">
              <Button onClick={() => setIsDialogOpen(true)} className="bg-dark-4 w-1/2 sm:w-36 xl:w-52">دعوت<img alt="group icon" style={{ filter: 'invert(1)' }} className="mr-1" src='/icons/group.png' width={15} height={15} /></Button>
              <DynamicBtn call={(call as Call)} />
            </div>
          </div>
        ) : type === 'recording' ? (
          <div className="flex justify-center w-full gap-2 sm:gap-7">
            <Button onClick={() => navigator.clipboard.writeText(call.url)} className="bg-dark-4 w-1/2 flex items-center">همرسانی<Image alt="copy icon" className="mr-1" src='/icons/share.svg' width={15} height={15} /></Button>
            <Button onClick={() => router.push(call.url)} className="bg-blue-1 w-1/2 flex items-center">پخش<Image alt="play icon" className="mr-1" src='/icons/play.svg' width={10} height={10} /></Button>
          </div>
        ) : (
          <Avatars matchData={matchData} type="previous" />
        )}
      </footer>
      <SendMeetingRequest callId={call.id} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
    </div>
  );
};

const Avatars = ({ type, matchData }: { type?: 'previous', matchData: string[] }) => (
  <div className={`w-[170px] h-[35px] flex sm:-ml-10 ${type ? '-ml-8' : 'mb-8 sm:mb-0 -ml-16'}`}>
    {matchData ? matchData.map((img, index) => (
      <Image key={index} className="rounded-full -mr-3 object-contain" src={img} alt="avatar" width={35} height={35} />
    )) : null}
  </div>
);

export default MeetingCard;
