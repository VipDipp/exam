import { useState } from "react"
import tochka from "../public/tochka.svg"
import ListCard from "./ListCard"

const Lists: React.FC<any> = ({id ,name}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
      <div>
    {id == 0 ?
    <div className='flex flex-col items-center'>
        <a className='text-yellow-300 text-xl'>List not found</a>
        <a className='text-lg'>We can't find the list you're looking for. Select one of your lists from sidebar or create a new list.</a>
    </div>
    :
    <div>
        <div className="flex flex-row ml-5 items-center">
            <a className="mr-4 text-2xl font-bold">{name}</a>
            <img className="w-6" src={tochka} onClick={() => setIsOpen(isOpen != true)}/>
        </div>
        {isOpen ?
            <ListCard />
            :
            null
        }
    </div>
    }
    </div>
  )
}

export default Lists