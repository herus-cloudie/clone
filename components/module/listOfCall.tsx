'use client'

import { useGetCalls } from '@/hooks/useGetCalls';

import {Call, CallRecording} from '@stream-io/video-react-sdk';

import {Loader, MeetingCard} from './index';

const ListOfCall = ({type} : {type : 'previous' | 'upcoming' | 'recording'}) => {
    
  const {endedCalls, upcomingCalls, recordingsCall , isLoading } = useGetCalls();

  if(isLoading) return <Loader />;

  const getCalls = () => {
    switch (type) {
        case 'upcoming':
            return upcomingCalls;
        case 'recording':
            return recordingsCall;
        case 'previous':
           return endedCalls;
        default:
            return [];
    }
  };

  const NoCalls = () => {
    switch (type) {
        case 'upcoming':
            return <p className='text-xl flex justify-center mt-5'>هیچ دیداری در آینده وجود ندارد!</p>;
        case 'recording':
            return <p className='text-xl flex justify-center mt-5'>ویدیوی ضبط شده ای وجود ندارد!</p>;
        case 'previous':
            return <p className='text-xl flex justify-center mt-5'>تا به حال تماسی نداشته اید!</p>;
    }
  };

  const calls = getCalls();

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {
          calls && calls.length > 0 
          ? calls?.toReversed().map((call : CallRecording | Call) => <MeetingCard key={(call as Call).id} call={call} type={type}/>)
          : <NoCalls />
        }
    </div>
  )
}

export default ListOfCall;