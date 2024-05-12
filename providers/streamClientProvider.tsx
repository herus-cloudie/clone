// 'use client'

// import { useUser } from '@clerk/nextjs';
// import { StreamVideo , StreamVideoClient  } from '@stream-io/video-react-sdk';
// import React, { useEffect, useState } from 'react';

// const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// export const StreamClientProvider = ({children} : {children : React.ReactNode}) => {
//   const [videoClient , setVideoClient] = useState<StreamVideoClient>()
//   const {user , isLoaded} = useUser()

//   useEffect(() => {
//     if(!user || !isLoaded) return;
//     if(!apiKey) throw Error('we have missed api key!')
//   } , [user , isLoaded])

//   const client = new StreamVideoClient({
//     user : {
//       id : 'user?.id',
//       name : user?.username || user?.id,
//       image : user?.imageUrl ,
//     },
//     tokenProvider : ''
//   })
//   return (
//     <StreamVideo client={videoClient}>
//     </StreamVideo>
//   );
// };