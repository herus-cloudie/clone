'use client'

import { cn } from "@/lib/utils";
import { CallControls, CallParticipantsList, PaginatedGridLayout , SpeakerLayout } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react"

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false);

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

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center ">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div dir="ltr" className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/dashboard`)} />
      </div>

    </section>
  )
}

export default MeetingRoom