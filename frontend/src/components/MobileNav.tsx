import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAppContext } from "@/context/AppContext"
import MobileNavLinks from "./MobileNavLinks"


export const headerLinks = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Create Hotel ',
    to: '/create-hotel',
  },
  {
    label: 'My Hotel',
    to: '/my-hotel',
  },
  {
    label: 'My Reservation',
    to: '/my-reservation',
  },
]


const MobileNav = () => {
  const {isLoggedIn} = useAppContext();

  return (
    <nav>
      <Sheet>
        <SheetTrigger className="align-middle">
          <Menu className="text-black-400" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          {isLoggedIn ? (
            <MobileNavLinks />
          ) : (
            <Link to="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center w-full mt-10 text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign In
              </Button>
            </Link>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav