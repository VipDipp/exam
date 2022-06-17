import React, { useEffect, useState } from 'react'
import { deleteTask, updateTask } from '../api/api'
import trio from '../public/treugolnik.svg'
import trash from '../public/trash.svg'

const TaskDescription: React.FC<any> = ({taskName, taskId, taskDescription, taskStatus, listId, setTaskChosen}) => {
    const [description, setDescription] = useState(taskDescription)
    const [name, setName] = useState(taskName)
    const [status, setStatus] = useState(taskStatus)
    const [rename, setRename] = useState(false)

    const update = async () => {
        console.log(description)
        await updateTask(name, status, description, listId, taskId)
    }
    const dTask = async() => {
        await deleteTask(listId, taskId)
    }

  return (
    <div className='w-1/3 bg-yellow-400 ml-auto flex flex-col rightnav'>
        {rename ?
        <div className='bg-white h-12 m-2 flex flex-row items-center'>
            <input type='text' className='outline-none' onChange={(e) => {setName(e.target.value)}}/>
            <button type='button' className='w-1/5 ml-auto' onClick={async() => {
                await update()
            }}>Rename</button>
        </div>
        :
        <div className='bg-white h-12 m-2 flex flex-row items-center'>
            <input type="radio" onClick={async() => {
                setStatus('closed')
                await update()
                setTaskChosen(false)
            }}/>
            <a className='text-xl ml-5' onClick={() => {setRename(true)}}>{taskName}</a>
        </div>
        }
        <div className='bg-white h-2/6 ml-2 mr-2 flex flex-row'>
            <textarea className='w-full' onChange={async(e) =>{
                setDescription(e.target.value)
            }}>{taskDescription}</textarea>
        </div>
        <button type='button' className='bg-white ml-2 mr-2 mt-2' onClick={async() => {
            await update().then(() => {setTaskChosen(false)})
        }}>Update</button>
        <div className='flex flex-row mt-auto h-12'>
            <img src={trio} className='mr-auto w-5 ml-2 cursor-pointer' onClick={() => {setTaskChosen(false)}}/>
            <img src={trash} className='ml-auto w-6 mr-2 cursor-pointer' onClick={() => {
                dTask()
                setTaskChosen(false)
                }}/>
        </div>
    </div>
  )
}

export default TaskDescription