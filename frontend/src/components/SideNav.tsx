import React, { useEffect, useReducer, useState } from 'react'
import logo from '../public/logo2.svg'
import cog from '../public/cog.svg'
import trykutnyk from '../public/treugolnik.svg'
import globe from '../public/globe.svg'
import adjustments from '../public/adjustments.svg'
import styles from '../styles/custom.module.css'
import NewList from './NewList'
import ryska from '../public/ryska.svg'
import trash from '../public/trash.svg'
import { deleteList, getLists } from '../api/api'
import List from './List'
import NavCard from './NavCard'


const SideNav: React.FC<any> = ({setListId, setListName, setIsOpen}) => {
  const [lists, setLists] = useState(Object)
  const [chosen, setChosen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [navOpen, setNavOpen] = useState(true)

  useEffect(() => {
    const getHandler = async() => {
        const res = await getLists()
        setLists(Object.entries((await getLists())))
        return res
    }
    getHandler()
  }, [])
  return (
    
    <div className='bg-yellow-400 h-screen w-1/5 block'>
        <img src={logo} className='ml-2 mt-2'/>
        <div className={styles.sidenav}>
            <img className='w-6 cursor-pointer' src={trykutnyk} onClick={() => {setNavOpen(false)}}/>
            
            {  
                    (!Array.isArray(lists)) ?
                        null
                    :
                        lists.map((list) => {
                            return <List id={list[1].Id} name={list[1].Name} setId={setListId} setName={setListName} setDeleted={setIsDelete}/>
                        })
                             
            }
            
            <NewList setId={setListId} setName={setListName} chosen={chosen} setChosen={setChosen}/>
            
            <div className='flex flex-row snippets'>
                <img src={adjustments} className="hover:bg-yellow-300"/>
                <img src={globe} className="hover:bg-yellow-300"/>
                <img src={cog} className="hover:bg-yellow-300" onClick={() => {setIsOpen(true)}}/>
            </div>
        </div>
    </div>
  )
}

export default SideNav