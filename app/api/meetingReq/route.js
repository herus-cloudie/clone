import ConnectDataBase from "@/utils/connectDataBase";
import { AllUsers } from '@/utils/model';

export async function POST(req) {
    try {
        await ConnectDataBase();
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Problem at connecting to database' }), { status: 500 });
    }

    const { callId, invites } = await req.json();

    try {
        const invitedUsers = await AllUsers.find({ 'user.name': { $in: invites } });

        const noRequestBefore = invitedUsers.filter(user => 
            !user.meeting.includes(callId)
        );

        noRequestBefore.forEach(user => {
            user.meeting.push(callId);
        });

        await Promise.all(noRequestBefore.map(user => user.save()));

        return new Response(JSON.stringify({ message: 'Request sent' }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Error processing request' }), { status: 500 });
    }
}


export async function GET() {
    try {
        await ConnectDataBase();
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Problem at connecting to database' }), { status: 500 });
    }


    try {
        const allUsers = await AllUsers.find()
        return new Response(JSON.stringify({ message: 'successful fetch' , data : allUsers}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Error processing request' }), { status: 500 });
    }
}

