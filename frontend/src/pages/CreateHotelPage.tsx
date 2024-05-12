import CreateHotelForm from "@/forms/HotelForm/CreateHotelForm";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";


const CreateHotelPage = () => {

  const {mutate, isLoading} = useMutation(apiClient.createHotel, {
    onSuccess: () => {
      toast.success("Hotel created successfully!");
    },

    onError: () => {
      toast.error("Couldn't create")
    }
    
  });
  const handleSave = (hotelFromData: FormData) => {
    mutate(hotelFromData)
  }

  return (
    <>
      <section>
        <h3 className="h3-bold text-center sm:text-left">Create Hotel</h3>
      </section>

      <section className="my-8">
        <CreateHotelForm onSave={handleSave} isLoading={isLoading}  />
      </section>
    </>
  );
};

export default CreateHotelPage;
