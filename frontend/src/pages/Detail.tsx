import { Label } from "@/components/ui/label"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuetsForm from "@/forms/GuetsForm/GuetsForm";




const Detail = () => {

    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "fetchHotelById",
        () => apiClient.fetchHotelById(hotelId || ""),
        {
          enabled: !!hotelId,
        }
      );
    
      if (!hotel) {
        return <></>;
      }
  return (
    <div className="space-y-5">

        <div>
            <Label className="flex">
            {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
            ))}
            </Label>
            <h1 className="mt-3 text-xl font-semibold">{hotel.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {hotel.imageUrls.map((imageUrl) =>(
            <div className=" h=[300px] ">
            <img src={imageUrl} alt={hotel.name} className="w-full h-auto rounded-lg shadow-lg"/>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuetsForm 
           pricePerNight={hotel.pricePerNight}
           hotelId={hotel._id}
          />
        </div>
        </div>

    </div>
  )
}

export default Detail
