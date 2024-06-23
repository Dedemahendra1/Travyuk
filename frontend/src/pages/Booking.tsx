import BookingDetails from "@/components/BookingDetails"
import { useSearchContext } from "@/context/SearchContext"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client"
import ReservationForm from "@/forms/ReservationForm/ReservationForm";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "@/context/AppContext";

const Booking = () => {

    const search = useSearchContext()
    const { hotelId } = useParams();
    const [numberOfNights, setNumberOfNights] = useState<number>(0);
    const { stripePromise } = useAppContext();

    useEffect(() => {
      if (search.checkIn && search.checkOut) {
        const nights =
          Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24);
  
        setNumberOfNights(Math.ceil(nights));
      }
    }, [search.checkIn, search.checkOut]);
    
    const { data: paymentIntentData } = useQuery(
      "createPaymentIntent",
      () =>
        apiClient.createPaymentIntent(
          hotelId as string,
          numberOfNights.toString()
        ),
      {
        enabled: !!hotelId && numberOfNights > 0,
      }
    );
    const { data: hotel } = useQuery(
        "fetchHotelByID",
        () => apiClient.fetchHotelById(hotelId as string),
        {
          enabled: !!hotelId,
        }
      );

      const { data: currentUser } = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
      );
    

      if (!hotel) {
        return <></>;
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 p-6 bg-white rounded-lg shadow-lg">
      <BookingDetails 
         checkIn={search.checkIn}
         checkOut={search.checkOut}
         adultCount={search.adultCount}
         childCount={search.childCount}
         numberOfNights={numberOfNights}
         hotel={hotel}
      />
        {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >

          <ReservationForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  )
}

export default Booking
