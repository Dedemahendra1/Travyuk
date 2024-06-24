import { Link } from "react-router-dom"
import { HotelType } from "../../../backend/src/shared/types"
import { useState } from "react";
import { Button } from "./ui/button";

type Props = {
    hotel: HotelType;
}

const DestinationCards = ({hotel}: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);
  
    const maxDescriptionLength = 100;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
      <img
        src={hotel.imageUrls[0]}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
        <p className="text-sm text-gray-500 mt-2">
          {isExpanded ? hotel.description : `${hotel.description.substring(0, maxDescriptionLength)}...`}
        </p>
        <button
          onClick={toggleExpanded}
          className="text-sm text-blue-600 mt-2 hover:underline"
        >
          {isExpanded ? "Close" : "Read More"}
        </button>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-semibold">${hotel.pricePerNight}/night</span>
          <Button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            <Link
            to={`/detail/${hotel._id}`}
            >
                Book Now
            </Link>
          </Button>
        </div>
      </div>
    </div>

  )
}

export default DestinationCards
