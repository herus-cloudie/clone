'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import ReactDatePicker from "react-datepicker";

import { HomeCard , MeetingModal} from "./index";
import { MeetingStateType } from "@/constants/types";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import SendMeetingRequest from "./sendMeetingRequest";
import Image from "next/image";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<MeetingStateType>();
  const [callState, setCallState] = useState<Call>(); 
  const [values, setValues] = useState({
    time : new Date(),
    description : '',
    link : ''
  })

  const router = useRouter();

  const {user} = useUser();
  const client = useStreamVideoClient();
  
  const {toast} = useToast();
  
  const createMeeting = async () => {
    if(!client || !user) return; 
    
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
      
      if(meetingState == 'isInstantMeeting'){
        router.push(`/meeting/${id}`)
        toast({title : 'تماس ایجاد شد', description : 'تنظیمات اولیه رو انجام بدهید' , className : 'bg-dark-3'})
      } 

    } catch (error) {
      toast({title : 'مشکلی پیش اومده!' , description : 'لطفا دوباره تلاش کنید' , className : 'bg-red-500'})
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
      isOpen={meetingState === 'isInstantMeeting'}
      onClose={() => setMeetingState(undefined)}
      title={"جلسه را بلافاصله شروع کنید"}
      buttonText={"شروع نشست"}
      handleClick={createMeeting}
      />

      <MeetingModal 
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title={"پیوستن به جلسه"}
      buttonText={"وارد شو"}
      handleClick={() => router.push(`/meeting/${values.link}`)}
      >
        <Input className="bg-dark-3 border-none focus-visible:ring-offset-0 focus-visible:ring-0" onChange={(e) => setValues({...values , link : e.target.value})} placeholder="آدرس را اینجا بنویسید"/>
      </MeetingModal>

      {
        !callState ?
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title={"برنامه ریزی نشست"}
        buttonText={"ثبت و تنظیم قرار"}
        handleClick={createMeeting}
        >
          <div>
            <p className="mb-2 text-sky-2 text-leading-[22px] text-base">توضیحات</p>
            <Textarea onChange={(e) => setValues({...values , description : e.target.value})} className="bg-dark-3 border-none focus-visible:ring-offset-0 focus-visible:ring-0 "/>
          </div>
          <div className="text-center">
            <p className="mb-2 text-sky-2 text-leading-[22px] text-base">انتخاب تاریخ و زمان</p>
            <div dir="ltr" className="w-full">
              <ReactDatePicker selected={values.time} 
                onChange={(date) => setValues({...values , time : date!})}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={'MMMM d, yyyy h:mm aa'}
                timeCaption="time"
                className="rounded bg-dark-3 w-50 p-2 focus:outline-none"
              /> 
             </div>
          </div>
        </MeetingModal>
        : 
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title={"ملاقات شما با موفقیت ثبت شد"}
        buttonText={"لینک کامل"}
        handleClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callState.id}`)}
        buttonIcon="/icons/copy.svg"
        image="/icons/checked.svg"
        >
          <Button onClick={() => setMeetingState('isInviting')} className="bg-dark-4 w-full">
            <div className="w-4 h-4 ml-1">
              <Image alt="group icon" style={{ filter: 'invert(1)' }} className="" src='/icons/group.png' width={512} height={512} />
            </div>
            دعوت
          </Button>
        </MeetingModal>
      }

      <SendMeetingRequest callId={(callState as Call)?.id} isDialogOpen={meetingState == 'isInviting'} setIsDialogOpen={setMeetingState}/>
  </section> 
  
  )
}

export default MeetingTypeList;