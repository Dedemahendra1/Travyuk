import { Label } from "@/components/ui/label";
import { hotelTypes } from "@/config/Options";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./CreateHotelForm";
import { Input } from "@/components/ui/input";


const TypeSection = () => {
  const {
    register,
    watch,
    formState: {errors}
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
<div>
  <Label className="text-2xl font-bold">Type</Label>
  <div className="grid grid-cols-5 gap-5 mt-6">
  {hotelTypes.map((type) => (
    <div key={type}>
      <label
        htmlFor={`type-${type}`}
        className={
          typeWatch === type
            ? "cursor-pointer bg-blue-500 text-sm rounded-full px-4 py-2 font-semibold"
            : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
        }
      >
        <Input
          type="radio"
          id={`type-${type}`}
          value={type}
          {...register("type", {
            required: "This field is required",
          })}
          className="hidden"
        />
        {type}
      </label>
    </div>
  ))}
  {errors.type && (
    <p className="text-red-500 text-sm mt-2">{errors.type.message}</p>
  )}
</div>
</div>
  )
}

export default TypeSection
