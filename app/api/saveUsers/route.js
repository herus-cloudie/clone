import ConnectDataBase from "../../../utils/connectDataBase";
import {AllUsers} from '@/utils/model'

export async function POST(req) {
    const user = await req.json();
    const {name} = user;

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }

    const allUser = await AllUsers.find({});
    const existUser = allUser.find(({user}) => user.name == name);

    if(!existUser) {
        await AllUsers.create({user , friends: []});
        return Response.json({message : 'user added'} , {status : 200} );
    }else return Response.json({message : 'user have already added!'} , {status : 200});
}

export async function GET(){

    try {
        await ConnectDataBase()
    } catch (error) {
        console.log(error);
        return Response.json({message : 'problem at connecting to data base'} , {status : 500})
    }
    const allUser = await AllUsers.find({});
    return Response.json({allUser , message : 'get users successfully'} , {status : 200} );
}