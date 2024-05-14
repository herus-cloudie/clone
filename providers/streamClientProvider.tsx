'use client'

import React, { useEffect, useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { StreamVideo , StreamVideoClient } from '@stream-io/video-react-sdk';

import { Loader } from '@/components/module';
import { TokenProvider } from '@/actions/stream.actions';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamClientProvider = ({children} : {children : React.ReactNode}) => {
  const [videoClient , setVideoClient] = useState<StreamVideoClient>();
  const {user , isLoaded} = useUser();

  useEffect(() => {
    if(!user || !isLoaded) return;
    if(!API_KEY) throw Error('we have missed api key!')

    const client = new StreamVideoClient({
        apiKey : API_KEY,
        user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
        },
          tokenProvider : TokenProvider,
        });

        setVideoClient(client)
  } , [user , isLoaded])

  if(!videoClient) return <Loader/>;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};