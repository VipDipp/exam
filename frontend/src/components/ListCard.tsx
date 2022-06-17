import React from 'react'
import rename from '../public/rename.svg'
import trash from '../public/trash.svg'

const ListCard = () => {
  return (
    <div className='flex flex-col h-1/6 w-1/6 bg-white filter drop-shadow-xl border-gray-200 border absolute ml-4 text-xl flex-wrap '>
        <a>List options</a>
        <div className='flex flex-row'>
            <img src={rename}/>
            <a>Rename list</a>
        </div>
        <div className='flex flex-row'>
            <img src={trash}/>
            <a>Delete list</a>
        </div>
    </div>
  )
}

export default ListCard