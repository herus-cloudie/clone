'use client'

import { useRouter , useSearchParams } from "next/navigation";
import { useState } from "react"

import { cn } from "@/lib/utils";

import {CallControls, CallParticipantsList, PaginatedGridLayout , SpeakerLayout } from "@stream-io/video-react-sdk";

import { CallLayoutType } from "@/constants/types";
import {  EndCallBtn, ListOfLayout} from "@/components/module";

const MeetingRoom = () => {

  const [layout, setLayout] = useState<CallLayoutType>('grid')
  const [showParticipants, setShowParticipants] = useState(false);

  const searchParams = useSearchParams(); 
  const router = useRouter();

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'left'} />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'right'} />
    }
  }

  const isPersonalRoom = !!searchParams.get('personal')

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex flex-row-reverse size-full items-center justify-center ">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div dir="ltr" className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap mb-5 md:mb-0">
        <CallControls onLeave={() => router.push(`/dashboard`)} />
        <ListOfLayout setLayout={setLayout} showParticipants={showParticipants} setShowParticipants={setShowParticipants}/>
        {
          !isPersonalRoom ? <EndCallBtn /> : null 
        }
      </div>

    </section>
  )
}

export default MeetingRoom