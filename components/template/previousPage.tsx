
import { ListOfCall } from "@/components/module"

const PreviousPage = () => {
  return (
    <section className='flex size-full flex-col gap-10'>
        <h1 className='text-3xl font-bold'>دیدار های قبلی</h1>
        <ListOfCall type="previous"/>
    </section>
  )
}

export default PreviousPage