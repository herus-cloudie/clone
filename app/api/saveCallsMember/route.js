import ConnectDataBase from "../../../utils/connectDataBase";
import {PreviousCall} from '@/utils/model'

export async function POST(req) {
    const {user , callId} = await req.json();

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }

    const existCall = await PreviousCall.findOne({callId})

    if(existCall) {
        const existUser = existCall.users.find(User => User.id == user.id);

        if(!existUser) {
            existCall.users.push(user);
            existCall.save()
            return Response.json({message : 'user saved'} , {status : 200})

        } else return Response.json({message : 'both user and call have already saved'} , {status : 200}) 
    
    }else {
        await PreviousCall.create({users : [user], callId})
        return Response.json({message : 'call and user saved'} , {status : 200} )
    }
}
export async function GET() {

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }

    const allCall = await PreviousCall.find({})
    return Response.json({allCall} , {status : 200} )
}


    

    
