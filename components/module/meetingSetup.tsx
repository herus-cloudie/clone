'use client'

import { useEffect, useState } from "react"

import { DeviceSettings ,  VideoPreview, useCall , useConnectedUser} from "@stream-io/video-react-sdk";

import { Button } from "../ui/button";
import Loader from "./loader";

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete: (value: boolean) => void}) => {

  const [microphone , setMicrophone] = useState(false);
  const [camera , setCamera] = useState(false);

  const call = useCall();
  const user = useConnectedUser();
  
  useEffect(() => {
    if (!camera) call?.camera.disable();
    else call?.camera.enable();
    
    if (!microphone)call?.microphone.disable();
    else call?.microphone.enable();

  }, [microphone , camera , call?.camera, call?.microphone]);

  if(!call) return <Loader />;

  const joining = async () => {
     const saveCallsMember = await fetch('/api/saveCallsMember' , {
      method : 'POST',
      body : JSON.stringify({user , callId : call.id}),
      headers : {'Content-Type': 'application/json'}
    })
    const Data = await saveCallsMember.json();
    call.join();
    setIsSetupComplete(true);
  }
  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full h-screen">
      <h2 className="mb-3 font-semibold text-3xl">تنظیمات پیش‌فرض</h2>
      <VideoPreview className="w-[300px] h-[190px] sm:w-[500px] sm:h-[375px]"/>
      <div className="flex gap-16 mt-6">
        <div className="font-sans"><DeviceSettings /></div>
        <div className="flex items-center"><input onChange={() => setMicrophone(!microphone)} type="checkbox"/><label className="mr-2 font-medium">میکروفون</label></div>
        <div className="flex items-center"><input onChange={() => setCamera(!camera)} type="checkbox"/><label className="mr-2 font-medium">دوربین</label></div>
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5 text-xl mt-5" onClick={joining}>ملحق شدن</Button>
    </div>
  )
}

export default MeetingSetup;

