import ConnectDataBase from "../../../utils/connectDataBase";
import {AllUsers} from '@/utils/model'

export async function POST(req) {
    const {origin , destination} = await req.json();

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }

    const destinationUser = await AllUsers.findOne({'user.id' : destination.id});

    const existRequest = destinationUser.requests.find(requestOwner => requestOwner == origin.name);

    if(!existRequest) {
        destinationUser.requests.push(origin.name)
        destinationUser.save();
        return Response.json({message : 'request send'} , {status : 200});

    }else return Response.json({message : 'request have already sended'} , {status : 200});
}

export async function PATCH(req) {
    const {respond , sender , receiver} = await req.json();

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }

    const Sender = await AllUsers.findOne({'user.name' : sender});
    const Receiver = await AllUsers.findOne({'user.name' : receiver});

    if(respond == 'accept'){
        Receiver.friends.push(Sender.user);
        Receiver.requests.pop(sender);

        Sender.friends.push(Receiver.user);

        Sender.save();
        Receiver.save();

        return Response.json({message : 'accepted'} , {status : 200});

    } else if(respond == 'reject'){ 
        Receiver.requests.pop(sender);
        Receiver.save();

        return Response.json({message : 'rejected'} , {status : 200});
    }
    
}
