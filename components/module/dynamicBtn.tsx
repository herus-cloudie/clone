'use client'

import { useRouter } from 'next/navigation';

import { Button } from '../ui/button'

import { Call } from '@stream-io/video-react-sdk';

const DynamicBtn = ({call} : {call : Call}) => {
  const router = useRouter()

  function restTime () {
      const dateOfMeeting = call?.state.startsAt || new Date();
      const now = new Date();
      const timestamp1 = dateOfMeeting.getTime();
      const timestamp2 = now.getTime();
  
      const differenceInMilliseconds = timestamp1 - timestamp2;
  
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      const differenceInMinutes = Math.floor(differenceInSeconds / 60);
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const differenceInDays = Math.floor(differenceInHours / 24);
  
      const hours = differenceInHours % 24;
      const minutes = differenceInMinutes % 60;
  
      if(differenceInDays != 0 && differenceInSeconds > 0) return `${differenceInDays} روز`
      else if( differenceInDays == 0 && differenceInHours != 0) return `${hours} ساعت`
      else if( differenceInDays == 0 && differenceInHours == 0 && differenceInMinutes != 0 && minutes > 5) return `${minutes} دقیقه`
      else if( differenceInSeconds < 0  && differenceInMinutes >= -30) return 'درحال برگذاری'
      else if( differenceInSeconds < 0  && differenceInMinutes < -30) return 'اتمام'
      else return 'پیوستن'
  }

  return <Button disabled={restTime() != 'پیوستن' && restTime() != 'درحال برگذاری'} onClick={() => router.push(`/meeting/${call?.id}`)} className={`min-w-28 ${restTime() == 'پیوستن' ? 'bg-green-500' : restTime() == 'درحال برگذاری' ? 'bg-yellow-500' : restTime() == 'اتمام' ?  'bg-red-500': 'bg-blue-1'} w-1/2 sm:w-32 z-10`}>{restTime()}</Button>
}

export default DynamicBtn