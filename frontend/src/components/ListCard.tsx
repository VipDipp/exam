import React, { useState } from 'react'
import { deleteList, updateList } from '../api/api'
import rename from '../public/rename.svg'
import trash from '../public/trash.svg'

const ListCard: React.FC<any> = ({id, setIsOpen}) => {
  const [newName, setNewName] = useState('')
  const [renameList, isRenameList] = useState(false)
  return (
    <div className='flex flex-col h-1/6 w-1/6 bg-white filter drop-shadow-xl border-gray-200 border absolute ml-4 text-xl justify-center'>
        <div className='self-center w-full h-1/3 hover:bg-gray-200 items-center border-b-2 flex justify-center'>
          <a>List options</a>
        </div>
        {renameList ?
        <div className='flex flex-row items-center w-full h-1/3'>
            <input className='w-3/4' placeholder='New name' onChange={(e) => setNewName(e.target.value)}/>
            <a className='w-1/4 text-base border-gray-200 border' onClick={async() => {
              await updateList(newName, id)
              setIsOpen(false)
              }}>Rename</a>
        </div>
        :
        <div 
        className='flex flex-row items-center w-full h-1/3 hover:bg-gray-200 border-b-2 justify-center' 
        onClick={() => {
          isRenameList(true)
          }}>
            <img src={rename}/>
            <a>Rename list</a>
        </div>
        }
        <div 
        className='flex flex-row items-center w-full h-1/3 hover:bg-gray-200 justify-center'
        onClick={() => {
          deleteList(id)
        }}>
            <img src={trash}/>
            <a>Delete list</a>
        </div>
    </div>
  )
}

export default ListCard