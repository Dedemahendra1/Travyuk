import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
import { useQuery } from "react-query";
import * as apiClient from "../../src/api-client";
import { Label } from "@/components/ui/label";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchHotels",
    apiClient.fetchHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

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
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-8">
              {hotelData.map((hotel) => (
                <div
                  data-testid="hotel-card"
                  className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                >
                    <Label className="text-2xl font-bold">
                      {hotel.name}
                    </Label>
                    <div className="whitespace-pre-line">{hotel.description}</div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BsMap className="mr-1" />
                        {hotel.city}, {hotel.country}
                      </div>
                      <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BsBuilding className="mr-1" />
                        {hotel.type}
                      </div>
                      <div className="border border-slate-300 rounded-sm p-3 flex items-center"> 
                        <BiMoney className="mr-1" />${hotel.pricePerNight} per night
                      </div>
                      <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BiHotel className="mr-1" />
                        {hotel.adultCount} adults, {hotel.childCount} children
                      </div>
                      <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BiStar className="mr-1" />
                        {hotel.starRating} Star Rating
                      </div>
                    </div>

                    <div className="flex justify-end">
                    <Button size="sm" >
                      <Link to={`/edit-hotel/${hotel._id}`}>
                          View Details
                      </Link>
                    </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>
    </>
  )
}

export default MyHotels