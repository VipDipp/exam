import React, { useEffect, useState } from 'react'
import { SignOut } from '../api/api'
import styles from '../styles/custom.module.css'
import profile from '../public/profile.svg'
import Card from '../components/Card'
import SideNav from '../components/SideNav'
import Lists from '../components/Lists'
import poisk from '../public/poisk.svg'

const HomePage = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [listId, setListId] = useState(0)
  const [listName, setListName] = useState('')
  const [taskId, setTaskId] = useState()
  const [listPicked, setListPicked] = useState(false)

  console.log(listId)

  return (
    <div className='w-screen h-screen flex flex-row'>
      <SideNav setListId={setListId} setListName={setListName} />
      <div 
      onClick={() => {if (profileOpen) { setProfileOpen(false) }}}
      className='flex w-full h-full flex-col flex-auto'
      >
        <div>
          <div className='flex flex-row border-gray-200 border w-1/3 absolute mt-2 ml-2'>
            <img src={poisk}/>
            <a>Search</a>
          </div>
          <img 
            onClick={async () => {
              setProfileOpen(true)
            }} 
            className='ml-auto w-12' 
            src={profile}
            />
        </div>
        <Lists id={listId} name={listName}/>
      </div>
      {profileOpen ?
        <Card />
      :
        <></>
      }
    </div>
  )
}

export default HomePage