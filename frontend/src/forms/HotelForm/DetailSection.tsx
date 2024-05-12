import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HotelFormData } from "./CreateHotelForm";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const ratingNum = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-5">

      <div>
        <Label>
          Name
          <Input {...register("name", { required: "This field is required" })} id="name" placeholder="Grand Indonesia" />
          {errors.name && (<span className="text-red-500">{errors.name.message}</span>)}
        </Label>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        {/* city form */}
        <div className="w-full">
          <Label htmlFor="city">City</Label>
          <Input {...register("city", { required: "This field is required" })} id="city" placeholder="Jakarta" />
          {errors.city && 
          (<span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        {/* end city form */}
        
        {/* country form  */}
        <div className="w-full">
          <Label htmlFor="country">Country</Label>
          <Input {...register("country", { required: "This field is required" })} id="country" placeholder="Indonesia" />
          {errors.country && 
          (<span className="text-red-500">{errors.country.message}</span>
          )}
        </div>
        {/* end country form  */}
      </div>
        
      <div>
      <Label htmlFor="description">Description</Label>
        <Textarea
        id="description"
          {...register("description", { required: "This field is required" })}
          placeholder="Hotel description"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>


      <div className="flex flex-col gap-5 md:flex-row">
        {/* Price */}

        <div className="w-full">
          <Label htmlFor="pricePerNight">Price</Label>
          <Input
            type="number"
            id="pricePerNight"
            {...register("pricePerNight", { required: "This field is required" })}
            placeholder="price "
            min={1}
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </div>

        {/* star rating */}

    
        <div className="w-full">
        <Label>
          Star Rating
        </Label>
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className=" border rounded-md w-full h-10 p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {ratingNum.map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailSection;