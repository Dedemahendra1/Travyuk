import { useQuery } from "react-query";
import * as apiClient from "../api-client";


const MyReservation = () => {
    const { data: hotels } = useQuery(
        "fetchMyBookings",
        apiClient.fetchMyBookings
      );
    
      if (!hotels || hotels.length === 0) {
        return <span>No bookings found</span>;
      }
    
      return (
        <div className="space-y-6 p-4">
        <h1 className="text-3xl font-bold text-gray-800">My Reservation</h1>
        {hotels.map((hotel , index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-gray-300 rounded-lg p-6 gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="lg:w-full lg:h-[250px] rounded-lg overflow-hidden">
                <img
                src={hotel.imageUrls[0]}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                alt={hotel.name}
                />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                <div className="text-2xl font-bold text-gray-800">
                {hotel.name}
                <div className="text-xs font-normal text-gray-600">
                    {hotel.city}, {hotel.country}
                </div>
                </div>
                {hotel.bookings.map((booking, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <div className="text-sm">
                    <span className="font-bold text-gray-700 mr-2">Dates:</span>
                    <span className="text-gray-600">
                        {new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
                    </span>
                    </div>
                    <div className="text-sm mt-2">
                    <span className="font-bold text-gray-700 mr-2">Guests:</span>
                    <span className="text-gray-600">
                        {booking.adultCount} adults, {booking.childCount} children
                    </span>
                    </div>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
  )
}

export default MyReservation
