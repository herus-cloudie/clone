'use client'

import { useEffect, useState } from "react"

import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { Button } from "../ui/button";

import Loader from "./loader";

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete: (value: boolean) => void}) => {

  const [microphone , setMicrophone] = useState(false);
  const [camera , setCamera] = useState(false);

  const call = useCall();

  useEffect(() => {
    if (!camera) call?.camera.disable();
    else call?.camera.enable();
    
    if (!microphone)call?.microphone.enable();
    else call?.microphone.disable();

  }, [microphone , camera , call?.camera, call?.microphone]);

  if(!call) return <Loader />;

  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full h-screen">
      <h2 className="mb-3 font-semibold text-3xl">تنظیمات پیش‌فرض</h2>
      <VideoPreview />
      <div className="flex gap-16 mt-6">
        <div className="font-sans"><DeviceSettings /></div>
        <div className="flex items-center"><input onChange={() => setMicrophone(!microphone)} type="checkbox"/><label className="mr-2 font-medium">میکروفون</label></div>
        <div className="flex items-center"><input onChange={() => setCamera(!camera)} type="checkbox"/><label className="mr-2 font-medium">دوربین</label></div>
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5 text-xl mt-5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        ملحق شدن
      </Button>
    </div>
  )
}

export default MeetingSetup

// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';

// // import Alert from './Alert';
// import { Button } from '../ui/button';
// import Loader from './loader';

// const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete: (value: boolean) => void}) => {
//   // const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   // const callStartsAt = useCallStartsAt();
//   // const callEndedAt = useCallEndedAt();
//   // const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
//   // const callHasEnded = !!callEndedAt;

//   const call = useCall();
//   const [isMicCamToggled, setIsMicCamToggled] = useState(false);

//   useEffect(() => {
//     if (isMicCamToggled) {
//       call?.camera.disable();
//       call?.microphone.disable();
//     } else {
//       call?.camera.enable();
//       call?.microphone.enable();
//     }
//   }, [isMicCamToggled, call?.camera, call?.microphone]);

//   // if (callTimeNotArrived)
//   //   return (
//   //     <Alert
//   //       title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
//   //     />
//   //   );

//   // if (callHasEnded)
//   //   return (
//   //     <Alert
//   //       title="The call has been ended by the host"
//   //       iconUrl="/icons/call-ended.svg"
//   //     />
//   //   );
//   if(!call) return <Loader />;
//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-center text-2xl font-bold">Setup</h1>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 font-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggled}
//             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <Button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join();
//           setIsSetupComplete(true);
//         }}
//       >
//         Join meeting
//       </Button>
//     </div>
//   );
// };

// export default MeetingSetup;
