import ConnectDataBase from "../../../utils/connectDataBase";
import { AllUsers } from '@/utils/model';

export async function POST(req) {
    const { origin, destination } = await req.json();

    try {
        await ConnectDataBase();
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response(JSON.stringify({ message: 'Problem at connecting to database' }), { status: 500 });
    }

    const destinationUser = await AllUsers.findOne({ 'user.id': destination.id });
    if (!destinationUser) {
        return new Response(JSON.stringify({ message: 'Destination user not found' }), { status: 404 });
    }

    const existRequest = destinationUser.requests?.includes(origin.name);

    if (!existRequest) {
        destinationUser.requests = destinationUser.requests || [];
        destinationUser.requests.push(origin.name);
        await destinationUser.save();
        return new Response(JSON.stringify({ message: 'Request sent' }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Request has already been sent' }), { status: 200 });
    }
}

export async function PATCH(req) {
    const { respond, sender, receiver } = await req.json();

    try {
        await ConnectDataBase();
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response(JSON.stringify({ message: 'Problem at connecting to database' }), { status: 500 });
    }

    const Sender = await AllUsers.findOne({ 'user.name': sender });
    const Receiver = await AllUsers.findOne({ 'user.name': receiver });

    if (!Sender || !Receiver) {
        return new Response(JSON.stringify({ message: 'Sender or Receiver not found' }), { status: 404 });
    }

    if (respond === 'accept') {
        Receiver.friends = Receiver.friends || [];
        Receiver.requests = Receiver.requests || [];
        Sender.friends = Sender.friends || [];

        Receiver.friends.push(Sender.user);
        Receiver.requests = Receiver.requests.filter(request => request !== sender);

        Sender.friends.push(Receiver.user);

        await Sender.save();
        await Receiver.save();

        return new Response(JSON.stringify({ message: 'Accepted' }), { status: 200 });
    } else if (respond === 'reject') {
        Receiver.requests = Receiver.requests.filter(request => request !== sender);
        await Receiver.save();

        return new Response(JSON.stringify({ message: 'Rejected' }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid respond value' }), { status: 400 });
    }
}
