import { ListOfCall } from "@/components/module"

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-10'>
        <h1 className='text-3xl font-bold'>جلسات ضبط شده</h1>
        <ListOfCall type="recording"/>
    </section>
  )
}

export default Recordings