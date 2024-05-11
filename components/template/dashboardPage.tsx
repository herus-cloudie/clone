import { MeetingTypeList } from "../module";

const DashboardPage = () => {
  const now = new Date()
  
  const TimeInIran = now.toLocaleTimeString('fa-IR' , {hour : '2-digit' , minute : '2-digit'})
  const dateInIran = now.toLocaleDateString('fa-IR');
  const dateIntl = (new Intl.DateTimeFormat('en-US', {dateStyle : 'full'})).format(now)

  return (
    <section dir="ltr" className='flex size-full flex-col gap-10'>
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base">Upcoming Meeting at : 2:15 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extrabold lg:text-7xl"> {TimeInIran} </h1>
            <div className="flex flex-row justify-start items-center mt-5">
              <p className="text-sky-1 text-lg font-medium lg:text-2xl mr-16">{dateInIran}</p>
              <p className="text-sky-1 text-lg font-medium lg:text-2xl">{dateIntl}</p>
            </div>
          </div>
        </div>
      </div>  
      <MeetingTypeList />
    </section>
  )
}
export default DashboardPage;