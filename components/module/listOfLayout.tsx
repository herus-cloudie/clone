'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,   
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from "lucide-react"

import { CallStatsButton } from "@stream-io/video-react-sdk"

import { CallLayoutType, ListOfLayoutProps } from "@/constants/types"

const ListOfLayout = ({setLayout , showParticipants , setShowParticipants} : ListOfLayoutProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4C535b]"><LayoutList size={20}/></DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dark-1 text-white">
            {
                ['Grid' , 'Speaker-left', 'Speaker-right'].map(context => (
                <DropdownMenuItem key={context} onClick={() => setLayout(context.toLowerCase() as CallLayoutType)} className="cursor-pointer">{context}</DropdownMenuItem>
                ))
            }
            <DropdownMenuSeparator className="border-dark-1"/>
        </DropdownMenuContent>
        <CallStatsButton />
        <button className="" onClick={() => setShowParticipants(!showParticipants)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4C535b]">
                <Users size={20}/>
            </div>
        </button>
    </DropdownMenu>
  )
}

export default ListOfLayout