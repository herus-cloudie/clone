'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import HomeCard from "./homeCard";
import MeetingModal from "./meetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'>()
  const router = useRouter();

  const createMeeting = () => {

  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        icon="/icons/add-meeting.svg"
        title="دیدار جدید"
        description="جلسه را بلافاصله شروع کنید"
        handleClick={() => setMeetingState('isInstantMeeting')}
        ClassName='bg-orange-1'      />
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
  </section> 
  
  )
}

export default MeetingTypeList;