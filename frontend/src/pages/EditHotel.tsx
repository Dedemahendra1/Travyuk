import CreateHotelForm from "@/forms/HotelForm/CreateHotelForm";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams();
  
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      toast.success( "Hotel Saved Successfully!");
    },
    onError: () => {
      toast.error( "Error Saving Hotel");
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
        <CreateHotelForm hotel={hotel}  onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default EditHotel
 