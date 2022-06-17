import { useEffect, useState } from "react"
import tochka from "../public/tochka.svg"
import ListCard from "./ListCard"
import plus from "../public/plus.svg"
import { addTask, getTasks } from "../api/api"
import Task from "./Task"
import TaskDescription from "./TaskDescription"

const Lists: React.FC<any> = ({id ,name, isOpen, setIsOpen}) => {
    const [tasks, setTasks] = useState(Object)
    const [chosen, setChosen] = useState(false)
    const [task, setTask] = useState('')
    const [taskChosen, setTaskChosen] = useState(false)
    const [idChosen, setIdChosen] = useState(0)
    const [nameChosen, setNameChosen] = useState('')
    const [descriptionChosen, setDescriptionChosen] = useState('')
    const [statusChosen, setStatusChosen] =useState('')

    useEffect(() => {
        const getHandler = async() => {
            setTasks(Object.entries((await getTasks(id)).Tasks))
            console.log(Object.entries((await getTasks(id)).Tasks))
        }
        getHandler()
      }, [id])
      
    return (
        <div>
        {id == 0 ?
        <div className='flex flex-col items-center'>
            <a className='text-yellow-300 text-xl'>List not found</a>
            <a className='text-lg'>We can't find the list you're looking for. Select one of your lists from sidebar or create a new list.</a>
        </div>
        :
        <div className="flex flex-row w-full">
            {isOpen ?
                <ListCard id={id} setIsOpen={setIsOpen}/>
                :
                null
            }
            <div className="flex flex-col ml-5 w-full">
                <div className="flex flex-row items-center">
                    <a className="mr-4 text-2xl font-bold">{name}</a>
                    <img className="w-6 cursor-pointer" src={tochka} onClick={() => setIsOpen(isOpen != true)}/>
                </div>
                
                {chosen ?
                <div className="flex flex-row w-1/5 border">
                    <input className='ml-4 w-3/4 text-xl outline-none placeholder-gray-400' placeholder='New list' onChange={(e) => {setTask(e.target.value)}}/>
                    <button 
                    className='ml-auto mr-6 text-yellow-400' 
                    type='button' 
                    onClick={async() => {
                        await addTask(task, id)
                        setChosen(false)
                    }}
                    >Add</button>
                </div>
                :
                <div className="flex flex-row hover:bg-yellow-100 h-12 items-center" onClick={() => {setChosen(true)}}>
                    <img src={plus}/>
                    <a className="ml-4 text-yellow-400 text-xl">Add a task</a>
                </div>
                }
                {  
                 
                    (!Array.isArray(tasks)) ?
                        null
                    :
                    tasks.map((task: any, i:number) => {
                        if (task[1].Id == 0) return
                        return <Task 
                        name={task[1].Name}
                        taskId={task[1].Id}
                        status={task[1].Status} 
                        id={id} 
                        description={task[1].Description} 
                        setTaskChosen={setTaskChosen}
                        setIdChosen={setIdChosen}
                        setNameChosen={setNameChosen}
                        setDescriptionChosen={setDescriptionChosen}
                        setStatusChosen={setStatusChosen}
                        />
                    })   
                
                }    
            </div>
            {taskChosen ?
            <TaskDescription 
                taskName={nameChosen} 
                taskId={idChosen} 
                taskDescription={descriptionChosen} 
                taskStatus={statusChosen} 
                listId={id} 
                setTaskChosen={setTaskChosen}
            />   
            :
            null
            }   
        </div>
        }
        </div>
    )
}

export default Lists