
import { Call } from '@stream-io/video-react-sdk'
import {Schema , model , models} from 'mongoose'


const PreviousCallSchema = new Schema({
    users : {
        require : true,
        type : Array
    },
    callId : {
        require : true,
        type : String
    },
} ,  {timestamps : true})

const PreviousCall = models.PreviousCall || model("PreviousCall" , PreviousCallSchema)

const AllUsersSchema = new Schema({
    user : {
        require : true,
        type : Object
    },
    friends : Array,
    requests : Array,
    meeting : Array
} ,  {timestamps : true})

const AllUsers = models.AllUsers || model("AllUsers" , AllUsersSchema)


export {PreviousCall , AllUsers}
