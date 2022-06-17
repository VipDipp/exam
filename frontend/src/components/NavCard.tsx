import profile from '../public/profile.svg'
import logout from '../public/logout.svg'
import { SignOut } from '../api/api'
import { useUserContext } from '../App'

const NavCard = () => {
    const {loggedIn, setLoggedIn} = useUserContext()
  return (
    <div className='flex flex-col bg-white filter drop-shadow-xl border-gray-200 border absolute bottom-7 ml-28 w-1/12 h-1/8'>
        <div className='flex flex-row hover:bg-gray-200 h-1/2 w-full items-center self-center'>
            <img className='w-1/6' src={profile}/>
            <a>Profile</a>
        </div>
        <div className='flex flex-row hover:bg-gray-200 h-1/2 w-full items-center' onClick={async () => {
                await SignOut().then(() => {
                    setLoggedIn(false)
                })
                }}>
            <img className='w-1/6' src={logout}/>
            <a>LogOut</a>
        </div>
    </div>
  )
}

export default NavCard