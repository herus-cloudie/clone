'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const SecretKey = process.env.STREAM_SECRET
const ApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export const TokenProvider = async () => {
    const User = await currentUser();

    if(!SecretKey) throw new Error('Oops , we have missed SecretKey!')
    if(!ApiKey) throw new Error('Oops , we have missed ApiKey!')
    if(!User) throw new Error('Oops , we do not have any User!')

    const Client = new StreamClient(ApiKey,SecretKey)   

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const Token = Client.createToken(User.id , expirationTime , issuedAt)
    return Token;
}


