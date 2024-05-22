import { Dispatch, SetStateAction } from "react";

interface HomeCardProps{
    title : string , 
    ClassName : string , 
    icon : string , 
    description : string , 
    handleClick : () => void 
}
interface ListOfLayoutProps{
    setLayout : Dispatch<SetStateAction<CallLayoutType>> , 
    showParticipants : boolean,
    setShowParticipants : (value : boolean) => void
}

interface MeetingModalProps{
    isOpen: boolean ,
    onClose: () => void ,
    title: string ,
    handleClick?: () => void ,
    buttonText?: string ,
    image?: string ,
    buttonIcon?: string ,
    ClassName?: string ,
    children?: React.ReactNode
}
type MeetingStateType = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';


export type {HomeCardProps , MeetingModalProps , ListOfLayoutProps , CallLayoutType , MeetingStateType }