const now = new Date();

const LongDynamicTime = ({timeZone , time} : {timeZone : string , time : any}) => {
    return (new Intl.DateTimeFormat(timeZone, {dateStyle : 'full'})).format(time);
} 

const TimeInIran = (time ?: any) => {
    if(time) return time.toLocaleTimeString('fa-IR' , {hour : '2-digit' , minute : '2-digit'})
    else return now.toLocaleTimeString('fa-IR' , {hour : '2-digit' , minute : '2-digit'})
}
const DateInIran = (time ?: any) => {
    if(time) return time.toLocaleDateString('fa-IR');
    else return now.toLocaleDateString('fa-IR');
}
export {LongDynamicTime , TimeInIran , DateInIran}