'use client'

import { useState } from "react";

import { StreamCall, StreamTheme} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { Loader, MeetingRoom, MeetingSetup } from "@/components/module";

import { useGetCallById } from "@/hooks/useGetCallById";

const MeetingId = ({params} : {params : {id : string}}) => {

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {isLoaded} = useUser();
  const {call , isCallLoaded} = useGetCallById(params.id);
  
  if(!isLoaded || !isCallLoaded) return <Loader />
    return (
      <main className="h-screen w-full">
        <StreamCall call={call}>
          <StreamTheme>
            {
              !isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />
            }
          </StreamTheme>
        </StreamCall>
      </main>
    )
  }
  
export default MeetingId;