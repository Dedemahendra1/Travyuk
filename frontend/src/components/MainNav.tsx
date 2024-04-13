import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAppContext } from '@/context/AppContext'
import { headerLinks } from './MobileNav'
import SignOut from './SignOut'


const MainNav = () => {

  const {isLoggedIn} = useAppContext()
  return (
    <span className='flex space-x-2 gap-3 items-center'>
      {isLoggedIn ? (
        <>
        {headerLinks.map((link) =>{
              return (
                <Link to={link.to} className=" flex items-center bg-white font-bold hover:text-blue-500" key={link.label}>
                    {link.label}
                </Link>
              )
            })}
          <SignOut />
        </>
      ) : (
        <>
        <Link to="/sign-in">
            <Button
            variant="outline"
            size="lg"
            className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
            Sign In
            </Button>
        </Link>
        </>
      )}
    </span>
  )
}

export default MainNav