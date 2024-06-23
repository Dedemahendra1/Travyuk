import { HotelType } from "../../../backend/src/shared/types";
import { FaMapMarkerAlt, FaCalendarCheck, FaCalendarTimes, FaUsers } from 'react-icons/fa';

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetails = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
  return (
<div className="grid gap-4 p-6 bg-white rounded-lg border border-gray-300 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Your Booking Details</h2>

      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
        <FaMapMarkerAlt className="text-blue-500 text-lg" />
        <div>
          <span className="text-gray-700">Location:</span>
          <div className="font-semibold text-gray-900">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <div className="flex items-center gap-3">
          <FaCalendarCheck className="text-green-500 text-lg" />
          <div>
            <span className="text-gray-700">Check-in</span>
            <div className="font-semibold text-gray-900">{checkIn.toDateString()}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaCalendarTimes className="text-red-500 text-lg" />
          <div>
            <span className="text-gray-700">Check-out</span>
            <div className="font-semibold text-gray-900">{checkOut.toDateString()}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-2">
        <span className="text-gray-700">Total length of stay:</span>
        <div className="font-semibold text-gray-900">{numberOfNights} nights</div>
      </div>

      <div className="flex items-center gap-3">
        <FaUsers className="text-purple-500 text-lg" />
        <div>
          <span className="text-gray-700">Guests</span>
          <div className="font-semibold text-gray-900">
            {adultCount} adults & {childCount} children
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;