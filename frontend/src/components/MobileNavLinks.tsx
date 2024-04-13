import { Link } from "react-router-dom"
import { headerLinks } from "./MobileNav"
import SignOut from "./SignOut"


const MobileNavLinks = () => {
  return (
    <>
            {headerLinks.map((link) =>{
              return (
                <Link to={link.to} className="flex bg-white items-center font-bold hover:text-blue-500" key={link.label}>
                    {link.label}
                </Link>
              )
            })}

          <SignOut />
    </>
  )
}

export default MobileNavLinks
