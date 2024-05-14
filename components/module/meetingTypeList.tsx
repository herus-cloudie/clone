'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { HomeCard , MeetingModal} from "./index";

import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'>();
  
  const { toast } = useToast();

  const router = useRouter();

  const {user} = useUser();
  const client = useStreamVideoClient();

  const [callState, setCallState] = useState<Call>()
  const [values, setValues] = useState({
    time : new Date(),
    description : '',
    link : ''
  })

  const createMeeting = async () => {
    if(!client || !user) return;
    if(!values.time) return toast({variant : 'destructive', title: "لطفا تاریخ را انتخاب کنید"})
  
    const id = crypto.randomUUID();
    const starts_at = values.time.toISOString() || new Date().toISOString();
    const description = values.description || 'نشست فوری';

    try {
      const call = client.call('default' , id);
      if(!call) throw new Error('failed to create call');

      await call.getOrCreate({
        data: {
          starts_at,
          custom :{
            description,
          }
        },
      });

      setCallState(call)
      if(!values.description) router.push(`/meeting/${id}`)
      toast({title: "جلسه با موفقیت ایجاد شد"})

    } catch (error) {
      console.log(error)
      toast({
        variant : 'destructive',
        title: "مشکلی در تشکیل نشست به وجود آمده",
      })

    }
  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

      <HomeCard
        icon="/icons/add-meeting.svg"
        title="دیدار جدید"
        description="جلسه را بلافاصله شروع کنید"
        ClassName='bg-orange-1'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        icon="/icons/join-meeting.svg"
        title="پیوستن به جلسه"
        description="از طریق لینک دعوت"
        ClassName="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        icon="/icons/schedule.svg"
        title="برنامه ریزی نشست"
        description="برای دیدار خود برنامه ریزی کنید"
        ClassName="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        icon="/icons/recordings.svg"
        title="ضبط شده"
        description="دیدن جلسات ثبت شده"
        ClassName="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal 
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title={"جلسه را بلافاصله شروع کنید"}
      buttonText={"شروع نشست"}
      handleClick={createMeeting}
      />

  </section> 
  
  )
}

export default MeetingTypeList;