import DynamicMeetingPage from "@/components/template/dynamicMeetingPage"

const MeetingId = ({params} : {params : {id : string}}) => {
  return <DynamicMeetingPage id={params.id}/>
}

export default MeetingId