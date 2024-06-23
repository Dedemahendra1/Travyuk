import { Label } from "@/components/ui/label"
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import { useSearchContext } from "@/context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import * as apiClient from "../../api-client"
import { useForm } from "react-hook-form";
import { StripeCardElement } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

type Props = {
    currentUser: UserType  
    paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number;
  };

const ReservationForm = ({currentUser, paymentIntent}:Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();


  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        toast.success( "Reservation Success Saved!" );
      },
      onError: () => {
        toast.error("Error Saving Reservations!");
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
      defaultValues: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        adultCount: search.adultCount,
        childCount: search.childCount,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        hotelId: hotelId,
        totalCost: paymentIntent.totalCost,
        paymentIntentId: paymentIntent.paymentIntentId,
      },
    });

    const onSubmit = async (formData: BookingFormData) => {
      if (!stripe || !elements) {
        return;
      }
  
      const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      });
  
      if (result.paymentIntent?.status === "succeeded") {
        bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
      }
    };
  return (
    <form 
    className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit"
    onSubmit={handleSubmit(onSubmit)}
    >
        <Label className="text-xl">
            Confirm Your Reservation
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg">
          <label className="text-gray-700 text-sm font-semibold">
            First Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-semibold">
            Last Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-semibold">
            Email
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Price Summary</h2>
          <div className="bg-blue-50 p-4 rounded-md shadow-md">
            <div className="font-semibold text-lg text-blue-700">
              Total Cost: ${paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            disabled={isLoading}
            type="submit"
            className={`bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-500 transition duration-300 ${
              isLoading ? 'cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? "Saving..." : "Confirm Reservation"}
          </Button>
        </div>
    </form>
  )
}

export default ReservationForm
