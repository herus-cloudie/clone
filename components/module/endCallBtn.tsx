'use client'

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const EndCallBtn = () => {
    const router = useRouter();

    const call = useCall();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.isCreatedByMe && localParticipant.userId === call.state.createdBy?.id 

    if(!isMeetingOwner) return null;

    const endCallForEveryOne = async () =>{
       await call.endCall(); 
       router.push('/dashboard')
    } 

    return (
        <Button className="bg-red-500" onClick={endCallForEveryOne}>End call for everyone</Button>
    )
}

export default EndCallBtn