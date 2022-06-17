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


const SideNav: React.FC<any> = ({setListId, setListName}) => {
  const [lists, setLists] = useState(Object)

  useEffect(() => {
    const getHandler = async() => {
        const res = await getLists()
        setLists(Object.entries((await getLists())))
        console.log(Object.entries(await getLists()))
        console.log(1)
        return res
    }
    getHandler()
  }, [])
  return (
    <div className='bg-yellow-400 h-screen w-1/5 block'>
        <img src={logo} className='ml-2 mt-2'/>
        <div className={styles.sidenav}>
            <img className='w-6' src={trykutnyk}/>
            
            {  
                    (!Array.isArray(lists)) ?
                        null
                    :
                        lists.map((list) => {
                            return <List id={list[1].Id} name={list[1].Name} setId={setListId} setName={setListName} />
                        })
                             
            }
            
            <NewList setId={setListId} setName={setListName}/>
            <div className='flex flex-row snippets'>
                <img src={adjustments}/>
                <img src={globe}/>
                <img src={cog}/>
            </div>
        </div>
    </div>
  )
}

export default SideNav