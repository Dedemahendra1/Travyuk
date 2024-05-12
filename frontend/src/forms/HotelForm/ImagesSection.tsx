import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./CreateHotelForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ImagesSection = () => {
 
  const {
    register,
    formState: {errors},
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <Label className="text-2xl fotn-bold ">Images</Label>
      <div className="border rounded p-4 flex flex-col gap-5 mt-3">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
               <div className="relative group">
                <img src={url} className="h-32 w-full object-cover" />
                <Button 
                  onClick={(event) => handleDelete(event, url)}
                >
                  Delete
                </Button>
               </div>
            ))}
          </div>
        )}

        <Input 
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-300 font-normal" 
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  )
}

export default ImagesSection