'use client'

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useEffect, useState } from "react";

export const useGetCallById = (id : string | string[]) => {

    const [call, setCall] = useState<Call>();
    const [isCallLoaded, setIsCallLoaded] = useState(false);

    const client = useStreamVideoClient();

    useEffect(() => {
      if (!client) return;
        
        const LoadCalls = async () => {
            const { calls } = await client.queryCalls({ filter_conditions: { id } });
            
            if(calls.length > 0) setCall(calls[0])
        }
        setIsCallLoaded(true)
        
        LoadCalls()
    } , [client , id])

    return {call , isCallLoaded}
}
