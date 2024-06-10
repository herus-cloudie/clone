import Image from "next/image";
import { useState } from "react";

import Loader from "./loader";
import MeetingModal from "./meetingModal";

import { SendMeetReqProps } from "@/constants/types";

import { useToast } from "../ui/use-toast";

import { useGetFriendsAndUsers } from "@/hooks/useGetFriendsAndUsers";

const SendMeetingRequest = ({callId , isDialogOpen , setIsDialogOpen} : SendMeetReqProps) => {
  const [invites, setInvites] = useState<string[]>([]);
  
  const {isLoaded , friends} = useGetFriendsAndUsers();

  const {toast} = useToast();

  const handleFriendSelect = (name : string) => setInvites((prevInvites) => prevInvites.includes(name) ? prevInvites.filter(invite => invite !== name) : [...prevInvites, name]);

  const sendRequest = async () => {
    if (invites.length === 0) return toast({ title: 'شما کسی را انتخاب نکرده‌اید!', className: 'bg-red-500' });
    
    const response = await fetch('/api/meetingReq', {
      method: 'POST',
      body: JSON.stringify({ callId, invites }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();

    if(result.message == "Request sent"){
      setIsDialogOpen(undefined)
      toast({title : `درخواست با موفقیت برای ${invites.map(invite => invite)} ارسال شد` , className : 'bg-green-500'})
    } 
    else if(result.message == 'Error processing request') toast({title : 'متاسفانه مشکلی پیش آمده! لطفا دوباره تلاش کنید' , className : 'bg-red-500'})
  };

  return (
    <MeetingModal
    isOpen={isDialogOpen}
    onClose={() => setIsDialogOpen(undefined)}
    title="دعوت دوستان"
    buttonText="ارسال دعوت"
    handleClick={sendRequest}
    >
    {!isLoaded ? <Loader /> : (
        friends.length == 0 ? <p className="text-center text-sky-1">متاسفانه هنوز هنوز دوستی ندارید!</p>
        : friends.map(({ name, image, id }) => (
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
  )
}

export default SendMeetingRequest;