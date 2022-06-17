import React from 'react'
import { SignOut } from '../api/api'
import logo from '../public/logo.svg'
import profile from '../public/profile.svg'

const Card: React.FC<any> = () => {
  return (
    <div className='w-1/6 h-1/5 bg-white filter drop-shadow-xl border-gray-200 border flex flex-col right-0 absolute'>
        <div className='flex flex-row'>
            <img className='w-6 ml-3' src={logo}/>
            <a className='text-lg text-gray-400 font-sans font-bold ml-1'>Todo</a>
            <a className='text-sm mt-2 ml-auto mr-5 text-gray-400' onClick={() => {SignOut()}}>Sign Out</a>
        </div>
        <div className='flex flex-row'>
            <img className='w-20 ml-6 mt-5' src={profile}/>
            <div className='flex flex-col ml-auto mt-5 mr-16'>
                <a>{localStorage.email}</a>
                <a className='text-yellow-400'>My profile</a>
            </div>
        </div>
    </div>
  )
}

export default Card