import { ListOfCall } from "@/components/module"

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10'>
        <h1 className='text-3xl font-bold'>دیدار های آینده</h1>
        <ListOfCall type="upcoming"/>
    </section>
  )
}

export default Upcoming