import React from 'react'
import SignUp from '../api/api'
import { useUserContext } from '../App'
import logo from '../public/logo.svg'

const SignForm: React.FC<any> = ({ children, handleSubmit }) => {
  const submitWrap = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  }
  return (
    <form className='w-1/3 h-1/2 bg-white filter drop-shadow-xl flex flex-col signform' onSubmit={submitWrap}>
      <div className='flex flex-row ml-5 mt-100'>
        <img className='w-12' src={logo}/>
        <a className='text-3xl text-gray-400 font-sans font-bold'>Todo</a>
      </div>
      {children}
    </form>
  )
}

export default SignForm