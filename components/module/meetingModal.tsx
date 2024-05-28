'use client'

import { Dialog , DialogContent } from "@/components/ui/dialog"
import { Button } from "../ui/button"

import Image from "next/image"

import { MeetingModalProps } from "@/constants/types"

const MeetingModal = ({isOpen , onClose , handleClick , buttonText , image , buttonIcon , title , ClassName , children} : MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none px-6 py-9 text-white bg-dark-1">
            <div className="flex flex-col gap-6">
                {image && (
                    <div className="flex justify-center">
                        <Image height={72} width={72} alt="meeting modal" src={image}/>
                    </div>
                )}
                <h1 className={`${ClassName} text-center text-2xl sm:text-3xl font-bold leading-[42px]`}>{title}</h1>
                {children}
                <Button onClick={handleClick} className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0">
                    {buttonIcon && (<Image height={13} width={13} alt="buttonIcon" src={buttonIcon}/>)} &nbsp;
                    {buttonText || 'برنامه ریزی نشست'}
                </Button>
            </div> 
        </DialogContent>
    </Dialog>
  );
}

export default MeetingModal