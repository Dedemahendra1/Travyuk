import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitySection from "./FacilitySection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {HotelType} from "../../../../backend/src/shared/types"

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
};

const CreateHotelForm = ({onSave, isLoading, hotel}: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
      reset(hotel);
    },[hotel,reset])

    const onSubmit = handleSubmit((formDataJson : HotelFormData) => {

        const formData = new FormData();
        if (hotel) {
          formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
  
        formDataJson.facilities.forEach((facility, index) => {
          formData.append(`facilities[${index}]`, facility);
        });
  
        if (formDataJson.imageUrls) {
          formDataJson.imageUrls.forEach((url, index) => {
            formData.append(`imageUrls[${index}]`, url);
          });
        }
  
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
          formData.append(`imageFiles`, imageFile);
        });
    
        onSave(formData);

      })


    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailSection />
                <TypeSection />
                <FacilitySection />
                <GuestSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                </span>
            </form>
        </FormProvider>
    );
};

export default CreateHotelForm;
