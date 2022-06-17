import React, { useState } from 'react'
import SignUp, { SignIn } from '../api/api'
import SignForm from '../components/SignForm'
import styles from '../styles/custom.module.css'


const SignPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [incorrect, setIncorrect] = useState(false)

  const handleSignIn = async () => {
    await SignIn(email, password)
  }

  const handleSignUp = async () => {
    if (confirm != password) {
      setIncorrect(true)
      return
    }
    await SignUp(email, password)
  }
  return (
    <div className={styles.signpage}>
      <div className={styles.signimg}> 
      {isLogin ?
        <SignForm handleSubmit={handleSignIn}>
          <a 
            className='text-xl mb-3'
          >SignIn </a>
          <input
            required={true}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder='Email'
            className='border-0 border-b border-gray-300 text-2xl placeholder-gray-300 focus:outline-none w-full font-ns'
          />
          <input
            type='password'
            required={true}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder='Password'
            className='border-0 border-b border-gray-300 text-2xl placeholder-gray-300 focus:outline-none w-full font-ns'
          />
          <a className='block'>
            No account? 
            <a className='ml-2 text-yellow-300 cursor-pointer hover:underline hover:text-yellow-400' onClick={() => setIsLogin(false)}>
              Create one!
            </a>
          </a>
          <a className='block cursor-pointer hover:underline'>
            Forgot password?
          </a>

          <button type='submit' className='bg-yellow-400 text-right mb-10 sign_in_button'>SignIn</button>
        </SignForm>
        :
        <SignForm handleSubmit={handleSignUp}>
          <a 
            className='text-xl mb-3'
          >SignUp</a>
          <input
            required={true}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder='Email'
            className='border-0 border-b border-gray-300 text-2xl placeholder-gray-300 focus:outline-none w-full font-ns'
          />
          <input
            type='password'
            required={true}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder='Password'
            className='border-0 border-b border-gray-300 text-2xl placeholder-gray-300 focus:outline-none w-full font-ns'
          />
          <input
            type='password'
            required={true}
            onChange={(e) => {setConfirm(e.target.value)}}
            placeholder='Confirm password'
            className='border-0 border-b border-gray-300 text-2xl placeholder-gray-300 focus:outline-none w-full font-ns'
            />
          {incorrect ?
          <a>Password are not the same</a>
          :
          <a></a>
          }
          <div className='flex flex-row buttons'>
            <button type='button' className='bg-gray-400 text-right mb-10' onClick={() => setIsLogin(true)}>Back</button>
            <button type='submit' className='bg-yellow-400 text-right mb-10'>SignUp</button>
          </div>
        </SignForm>
      }
      </div>
    </div>
  )
}

export default SignPage