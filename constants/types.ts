import { StaticImport } from "next/dist/shared/lib/get-img-props";
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

interface SendMeetReqProps{
    callId : string ,
    isDialogOpen : boolean , 
    setIsDialogOpen : (value: any) => void,
}

interface User {
    banned: boolean;
    channel_mutes: any[];
    created_at: string;
    custom: Record<string, any>;
    devices: any[];
    id: string;
    image: string | StaticImport;
    invisible: boolean;
    language: string;
    last_active: string;
    mutes: any[];
    name: string;
    online: boolean;
    role: string;
    teams: any[];
    total_unread_count: number;
    unread_channels: number;
    unread_threads: number;
}
interface MainUser{
    user : User,
    meeting : string[],
    createdAt : string ,
    requests : string[],
    updatedAt : string,
    friends : User[]
}

type MeetingStateType = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'isInviting'
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';


export type {HomeCardProps , MeetingModalProps , ListOfLayoutProps , SendMeetReqProps , CallLayoutType , MeetingStateType , User , MainUser}