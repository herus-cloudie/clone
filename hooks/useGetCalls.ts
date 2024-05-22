'use client'

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, CallRecording ,  useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [recordingsCall, setRecordingsCall] = useState<CallRecording[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members : { $in: [user.id] } },
            ],
            
          },
        });
        
        setCalls(calls);

        const getRecordedCall = async () => {
          const callData = await Promise.all(calls?.map((meeting) => meeting.queryRecordings()) ?? []);
          const validRecordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings)
          
          setRecordingsCall(validRecordings)
        }
        getRecordedCall()

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalls();
  }, [client, user?.id]);

  const now = new Date();
  
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => (startsAt && new Date(startsAt) < now) || !!endedAt)

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => startsAt && new Date(startsAt) > now)

  
  return { endedCalls, upcomingCalls, recordingsCall, isLoading  }
};