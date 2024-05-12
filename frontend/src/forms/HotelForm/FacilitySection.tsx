import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./CreateHotelForm";
import { facilityTypes } from "@/config/Options";
import { Input } from "@/components/ui/input";

const FacilitySection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <Label className="text-2xl font-bold">Facility</Label>
            <div className="grid grid-cols-4 gap-5 mt-6">
                {facilityTypes.map((facility) => (
                    <div key={facility} className="space-x-2 flex items-center">
                        <Input
                            type="checkbox"
                            id={`facility-${facility}`}
                            value={facility}
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one facility is required";
                                    }
                                }
                            })}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label
                            htmlFor={`facility-${facility}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {facility}
                        </label>
                    </div>
                ))}
            </div>
            {errors.facilities && <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>}
        </div>
    );
};

export default FacilitySection;
