import React, { useState } from 'react'
import { deleteList } from '../api/api'
import ryska from '../public/ryska.svg'
import trash from '../public/trash.svg'

const List: React.FC<any> = ({name, setId, setName, id}) => {
  return (
    <div 
    className='flex flex-row bg-yellow-100 h-6 items-center mr-4' 
    onClick={() => {
        setId(id)
        setName(name)
        }}>
        <img className='w-5' src={ryska}/>
        <a>{name}</a>
        <img className='w-5 ml-auto cursor-pointer' src={trash} onClick={() => {
            deleteList(id)
        }
            }/>
    </div>
  )
}

export default List