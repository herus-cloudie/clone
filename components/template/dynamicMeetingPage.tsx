'use client'

import { useState } from "react";

import { StreamCall, StreamTheme, VideoPreview} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { Loader, MeetingRoom, MeetingSetup ,  } from "../module";
import { useGetCallById } from "@/hooks/useGetCallById";

const DynamicMeetingPage = ({id} : {id : string}) => {
  const [isSetIsSetupComplete, setIsSetupComplete] = useState(false);
  const {user , isLoaded} = useUser();
  const {call , isCallLoaded} = useGetCallById(id);
  
  if(!isLoaded || !isCallLoaded) return <Loader />
    return (
      <main className="h-screen w-full">
        <StreamCall call={call}>
          <StreamTheme>
            {
              !isSetIsSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />
            }
          </StreamTheme>
        </StreamCall>
      </main>
    )
  }
  
export default DynamicMeetingPage;