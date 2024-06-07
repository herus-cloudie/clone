'use client'

import { useEffect, useState } from "react";

import { useConnectedUser } from "@stream-io/video-react-sdk"
import { MainUser, User } from "@/constants/types";
import { useToast } from "@/components/ui/use-toast";

export const useGetFriendsAndUsers = (dependence ?: string) => {

    const [friends , setFriends] = useState<User[]>([]);
    const [users , setUsers] = useState<MainUser[]>([]);
    const [mainUser , setMainUser] = useState<MainUser>();
    const [isLoaded , setIsLoaded] = useState<boolean>(false);

    const connectedUser = useConnectedUser();

    const {toast} = useToast();

    useEffect(() => {
        const FetchUsers = async () => {
          const getUsers = await fetch('/api/saveUsers');
          const {allUser , message} = await getUsers.json();
          if(message == 'get users successfully'){
            let mainUser = allUser.find(({user} : {user : any}) => connectedUser?.id == user.id);
            setUsers(allUser);
            setMainUser(mainUser)
            setFriends(mainUser.friends)
            setIsLoaded(true)
          } else toast({title : 'اینترنت مشکل دارد! لطفا اتصالتان را برسی کنید.' , className : 'bg-red'})
        }
        if(connectedUser) FetchUsers();
      } , [connectedUser , dependence])

    
    return {isLoaded , friends , users , mainUser}
}
