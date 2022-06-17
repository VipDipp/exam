import React, { useEffect, useState } from 'react'
import { addList, getLists } from '../api/api'
import plus from '../public/plus.svg'
import List from './List'

const NewList: React.FC<any> = ({setId, setName}) => {
  const [chosen, setChosen] = useState(false)
  const [list, setList] = useState('')
  const [newLists, setNewLists] = useState([{}])
  return (
    <div className='flex flex-col newLists'>
        <>
            {
                newLists.map((list: any, i) => {
                    if (i != 0) return <List id={list[0]} name={list[1]} setId={setId} setName={setName}/>
                })
            }
            {chosen ?
            <div className='flex flex-row bg-white mr-4'>
                <img className='w-6 fill-gray-400' src={plus} />
                <input className='ml-4 w-3/4 text-xl outline-none placeholder-gray-400' placeholder='New list' onChange={(e) => {setList(e.target.value)}}/>
                <button 
                className='ml-auto mr-6 text-yellow-400' 
                type='button' 
                onClick={async () => {
                    await addList(list).then((res: any) => {
                        setNewLists(newLists => [...newLists, [res.data.Id, res.data.Name, setId]])
                        console.log(newLists)
                        console.log(res.data)}
                        )
                    setChosen(false)
                }}
                >Add</button>
            </div>
            :
            <div className='flex flex-row'>
                <img className='w-6 cursor-pointer' onClick={() => {setChosen(true)}} src={plus} />
                <a className='ml-4 text-xl cursor-pointer' onClick={() => {setChosen(true)}}>New list</a>
            </div>
            }
        </>
    </div>
  )
}

export default NewList