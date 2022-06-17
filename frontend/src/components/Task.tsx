import React from 'react'
import { updateTask } from '../api/api'

const Task: React.FC<any> = ({name, taskId, status, id, description, setTaskChosen, setIdChosen, setNameChosen, setDescriptionChosen, setStatusChosen}) => {
  return (
    <div className='border-b-2 hover:bg-yellow-100 h-12 items-center flex flex-row' onClick={() => {
        setTaskChosen(false)
        
        setTaskChosen(true)
        setIdChosen(taskId)
        setNameChosen(name)
        setDescriptionChosen(description)
        setStatusChosen(status)
        }}>
        <input type="checkbox" onClick={async() => {
            let kind = status == "closed" ? "open" : "closed" 
            await updateTask(name, kind, description, id, taskId)
        }}/>
        {status == 'open' ?
        <a className='text-xl ml-4'>{name}</a>
        :
        <a className='text-xl ml-4 line-through'>{name}</a>
        }    
    </div>
  )
}

export default Task