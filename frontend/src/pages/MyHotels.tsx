import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";

const MyHotels = () => {
  return (
    <>
        <section className="bg-cover py-5 md:py-10">
          <div className="warpper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left">My Hotels</h3>
            <Button size="lg" className="rounded-full h-[54px] p-regular-16 hidden sm:flex">
                <Link to="/create-hotel" className="flex gap-2 items-center"> 
                <CiCirclePlus/>           
                    Create New Hotel
                </Link>
            </Button>
          </div>
        </section>

        <section >
                <div>
                    
                </div>
        </section>
    </>
  )
}

export default MyHotels