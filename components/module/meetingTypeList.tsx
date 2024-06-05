'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Call, useConnectedUser, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import ReactDatePicker from "react-datepicker";

import { HomeCard , Loader, MeetingModal} from "./index";
import { MeetingStateType } from "@/constants/types";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<MeetingStateType>();
  const [callState, setCallState] = useState<Call>();
  const [values, setValues] = useState({
    time : new Date(),
    description : '',
    link : ''
  })

  const connectedUser = useConnectedUser();
  const [allUsers , setAllUsers] = useState<any[]>([]);
  const [friends , setFriends] = useState<'fetching' | any[]>('fetching');
  const [invites, setInvites] = useState<string[]>([]);
  
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/saveUsers');
      const { allUser } = await response.json();
      setAllUsers(allUser);

      const mainUser = allUser?.find((item : any) => connectedUser?.id === item.user.id);
      setFriends(mainUser?.friends);
    };

    if (connectedUser) fetchUsers();
  }, [connectedUser , meetingState]);

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
      toast({title : 'تماس ایجاد شد', description : 'تنظیمات اولیه رو انجام بدهید' , className : 'bg-dark-3'})
      if(meetingState == 'isInstantMeeting') router.push(`/meeting/${id}`)

    } catch (error) {
      toast({title : 'مشکلی پیش اومده!' , description : 'لطفا دوباره تلاش کنید' , className : 'bg-red-500'})
    }
  } 

  const handleFriendSelect = (name : string) => {
    setMeetingState(undefined)
    setInvites((prevInvites) =>
      prevInvites.includes(name) ? prevInvites.filter(invite => invite !== name) : [...prevInvites, name]
    );
  };
    const sendRequest = async () => {
    if (invites.length === 0) {
      return toast({ title: 'شما کسی را انتخاب نکرده‌اید!', className: 'bg-red-500' });
    }

    const response = await fetch('/api/meetingReq', {
      method: 'POST',
      body: JSON.stringify({ callId: (callState as Call).id, invites }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    const result = await response.json();
    if(result.message == "Request sent"){
      setIsDialogOpen(false)
      toast({title : `درخواست با موفقیت برای ${invites.map(invite => invite)} ارسال شد` , className : 'bg-green-500'})
    }
    else if(result.message == 'Error processing request') toast({title : 'متاسفانه مشکلی پیش آمده! لطفا دوباره تلاش کنید' , className : 'bg-red-500'})
  };


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
          <Button onClick={() => setMeetingState('isInviting')} className="bg-dark-4 w-1/2 sm:w-36 xl:w-52">دعوت<img alt="group icon" style={{ filter: 'invert(1)' }} className="mr-1" src='/icons/group.png' width={15} height={15} /></Button>
        </MeetingModal>
      }
      <MeetingModal
        isOpen={meetingState == 'isInviting'}
        onClose={() => setMeetingState(undefined)}
        title="دعوت دوستان"
        buttonText="ارسال دعوت"
        handleClick={sendRequest}
      >
        {friends === 'fetching' ? <Loader /> : (
          friends.map(({ name, image, id }) => (
            <div key={id} className={`grid grid-cols-${friends.length <= 3 ? friends.length : 3} justify-items-center`}>
              <div onClick={() => handleFriendSelect(name)} className={`${invites.includes(name) ? 'bg-green-500 border-green-500' : 'bg-dark-3'} w-28 h-28 rounded-2xl flex flex-col justify-center items-center gap-3 cursor-pointer`}>
                <div className="img max-w-[60px] max-h-[80px]">
                  <Image alt="profile" width={70} height={70} className="rounded-full object-contain" src={image} />
                </div>
                <span>{name}</span>
              </div>
            </div>
          ))
        )}
      </MeetingModal>
  </section> 
  
  )
}

export default MeetingTypeList;