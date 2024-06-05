'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useConnectedUser } from "@stream-io/video-react-sdk"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import Loader from "./loader"

const FriendsSheet = () => {
  const router = useRouter();  

  const [allUser , setAllUser] = useState<any[]>([]);
  const [friends , setFriends] = useState<'fetching' | any[]>('fetching');
  const [search , setSearch] = useState<'user not found' | 'empty' | any[]>([]);

  const [activeTab , setActiveTab] = useState<'friends' | 'search' | 'requests'>('friends');
  const [ifRequestSendedState , setIfRequestSendedState] = useState<boolean>(false);
  const [searchValue , setSearchValue] = useState<string>('');

  const connectedUser = useConnectedUser();

  const { toast } = useToast();

  let mainUser = allUser?.find((item : { user: { id: string | undefined } }) => connectedUser?.id == item.user.id)

  useEffect(() => {
    const getUsersFunction = async () => {
      const getUsers = await fetch('/api/saveUsers');
      const {allUser} = await getUsers.json();
      setAllUser(allUser);

      let mainUser = allUser?.find((item : { user: { id: string | undefined } }) => connectedUser?.id == item.user.id)
      setFriends(mainUser?.friends)
    }
    if(connectedUser) getUsersFunction()
  } , [connectedUser , activeTab])

  const changeHandler = (e : any) => {
    const targetValue = e.target.value;
    setSearchValue(targetValue);

    const AllUserElseMainUser = allUser.filter(({user}) => user.name.toLowerCase().includes(targetValue.toLowerCase()) && user.name !== connectedUser?.name)
    const searchByText = AllUserElseMainUser.filter(({user}) => user.name != (friends as any[]).map(({name}) => name));

    if(targetValue != '' && searchByText?.length == 0) return setSearch('user not found')
    else if(targetValue == '') return setSearch('empty')
    else setSearch(searchByText)
  }

  const sendRequestFriend = async (user: any) => {
    toast({
      title : 'درخواست ارسال شد',
      className : 'bg-dark-3'
    })
    const sendReq = await fetch('/api/friendReq' , {
      method : 'POST',
      body : JSON.stringify({origin : connectedUser , destination : user}),
      headers : {'Content-Type': 'application/json'}
    })
    setIfRequestSendedState(true)
  }
  
  const acceptOrRejectReq = async (respond : 'accept' | 'reject' , sender : string) => {
    const sendRespond = await fetch('/api/friendReq' , {
      method : 'PATCH',
      body : JSON.stringify({sender , receiver : connectedUser?.name , respond}),
      headers : {'Content-Type': 'application/json'}
    })
    
    mainUser?.requests.pop(sender);
    setSearch([])
    router.refresh();

    if(respond == 'accept') toast({title : 'درخواست با موفقیت قبول شد' , className : 'bg-green-500'})
      else toast({title : 'درخواست حذف گردید', className : 'bg-red-500'})
  }


  const DynamicRequests = () => {  
    if(mainUser && mainUser.requests?.length != 0 ){
      return mainUser?.requests.map((req : string) => (
        <div key={req} className="p-3 rounded-sm bg-dark-3 flex-row-reverse w-full flex justify-between items-center">
          <div>
            <div className="h-[60px]">
              <Image width={512} height={512} alt="profile" src={allUser?.find(({user}) => user.name == req).user.image} className="rounded-full object-cover w-full h-4/5 relative -top-5 -left-5"/>
            </div>
            <p className="text-xl -mt-5">{req}</p>
          </div>
          <div className="flex gap-4">
            <div onClick={() => acceptOrRejectReq('accept' , req)} style={{filter : 'invert(1)'}} className="flex-center bg-[#E244EF] cursor-pointer size-10 rounded-[10px]"><Image alt="add friend" width="22" height="22" src="/icons/check-mark.png" style={{color : "transparent"}}/></div>
            <div onClick={() => acceptOrRejectReq('reject' , req)} style={{filter : 'invert(1)'}} className="flex-center bg-[#6CFFC8] cursor-pointer size-10 rounded-[10px]"><Image alt="add friend" width="20" height="20" src="/icons/cancel.png" style={{color : "transparent"}}/></div>  
          </div>
        </div>
        ))
      }
    else return <div className="h-32 w-full flex justify-center items-center"><p className="font-2xl">صندوق درخواست شما خالی است.</p></div> 
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="max-w-8 max-h-8 mr-10 ml-5 sm:ml-7 sm:mr-0 cursor-pointer">
            <Image style={{filter : 'invert(1)'}} alt="group png" src={'/icons/group.png'} width={512} height={512}/>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-dark-2 border-none text-white">
          <div className='mt-6 mr-2'>
              <h2 className="text-2xl font-bold">دوستان</h2>
              <div className="flex gap-7 flex-col justify-center items-center w-full mt-10">
                <Tabs dir="rtl" defaultValue="friends" className="w-full">
                  <TabsList  className="flex justify-around items-center">
                    <TabsTrigger onClick={() => setActiveTab('friends')} className={activeTab == 'friends' ? 'border-b-4 focus-visible:ring-offset-0 focus-visible:ring-0' : 'bg-dark-4 focus-visible:ring-offset-0 focus-visible:ring-0'} value="friends">دوستان من</TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('search')}  className={activeTab == 'search' ? 'border-b-4 focus-visible:ring-offset-0 focus-visible:ring-0' : 'bg-dark-4 focus-visible:ring-offset-0 focus-visible:ring-0'} value="search">پیدا کردن</TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('requests')}  className={activeTab == 'requests' ? 'border-b-4 focus-visible:ring-offset-0 focus-visible:ring-0' : 'bg-dark-4 focus-visible:ring-offset-0 focus-visible:ring-0'} value="requests">درخواست ها</TabsTrigger>
                  </TabsList>
                  {
                    friends == 'fetching' ? <Loader />
                    : <div className="mt-10">
                        <TabsContent value="friends">
                          <div className="flex flex-col gap-4 items-center justify-center">
                            {
                              friends && friends.length != 0
                              ? friends?.map(({name , image , id} : {name : string , image : string , id : string}) => (
                                <div key={id} className="friend-card bg-dark-3">
                                  <div className="friend-card-border-top">
                                  </div>
                                  <div className="img max-w-[60px] max-h-[80px]">
                                    <Image alt="profile" width={70} height={70} className="rounded-full object-contain" src={image}/>
                                  </div>
                                  <span>{name}</span>
                                </div>
                              ))
                              : <div className="h-32 w-full flex justify-center items-center"><p className="font-2xl">هنوز پارتنری ندارید.</p></div> 
                            }
                          </div>
                        
                        </TabsContent>
                        <TabsContent value="requests">
                           <DynamicRequests />
                        </TabsContent>
                        <TabsContent value="search">
                          <div className="my-7">
                            <Input value={searchValue} disabled={allUser?.length == 0} dir="ltr" className="bg-dark-3 border-none focus-visible:ring-offset-0 focus-visible:ring-0 rounded-lg" onChange={changeHandler} placeholder="Search user ..." />
                          </div>
                          {
                            search && search != 'user not found' && search != 'empty' && search?.length != 0 ?
                              search?.map(({user, requests}) => {
                                const {name , id , image} = user;
                                let ifRequestSended = requests?.find((name : string) => name == connectedUser?.name)
                                const ifDestinationUserSendedReqAlready = mainUser.requests?.find((req : string) => req == name)

                                return (
                                  <div key={id} className="p-3 rounded-sm bg-dark-3 flex-row-reverse w-full flex justify-between items-center">
                                    <div>
                                      <div className="h-[60px]">
                                        <Image  width={512} height={512} alt="profile" src={image} className="rounded-full object-cover w-full h-4/5 relative -top-5 -left-5"/>
                                      </div>
                                      <p className="text-xl -mt-5">{name}</p>
                                    </div>
                                    {
                                      ifRequestSended || ifRequestSendedState ?
                                        <div key={id} className="flex items-end">
                                            <span className="text-sm ml-2 text-sky-1">ارسال شده</span>
                                            <Image alt="waiting png  pb-2" style={{filter : 'invert(1)'}} width={20} height={20} src={'/icons/wall-clock.png'}/>
                                        </div>
                                      : ifDestinationUserSendedReqAlready ?
                                        <div className="flex gap-4">
                                            <div onClick={() => acceptOrRejectReq('accept' , name)} style={{filter : 'invert(1)'}} className="flex-center bg-[#E244EF] cursor-pointer size-10 rounded-[10px]"><Image alt="add friend" width="22" height="22" src="/icons/check-mark.png" style={{color : "transparent"}}/></div>
                                            <div onClick={() => acceptOrRejectReq('reject' , name)} style={{filter : 'invert(1)'}} className="flex-center bg-[#6CFFC8] cursor-pointer size-10 rounded-[10px]"><Image alt="add friend" width="20" height="20" src="/icons/cancel.png" style={{color : "transparent"}}/></div>  
                                        </div>
                                      : <div onClick={() => {
                                        sendRequestFriend(user)
                                        ifRequestSended = true
                                      }} className="flex-center bg-green-500 cursor-pointer size-12 rounded-[10px]"><Image alt="add friend" width="27" height="27" src="/icons/add-meeting.svg" style={{color : "transparent"}}/></div>
                                    }
                                    </div>
                                )
                              })
                              : search == 'user not found' ? <div className="h-32 w-full flex justify-center items-center"><p className="font-2xl">متاسفانه کاربری با آیدی پیدا نشد! </p></div>
                              : null
                            }
                        </TabsContent>
                      </div>
                  }
                </Tabs>
              </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>

  )
}
export default FriendsSheet;
