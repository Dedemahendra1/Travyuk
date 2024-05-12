import { Label } from "@/components/ui/label";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaChildren } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./CreateHotelForm";
import { Input } from "@/components/ui/input";

const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <Label className="text-2xl font-bold">Guests</Label>
            <div className="grid grid-cols-2 gap-5 rounded-lg p-6 mt-6 bg-gray-300">
                <div>
                    <Label className="text-sm font-semibold flex items-center gap-1">
                        <IoPersonCircleOutline />
                        Adults
                    </Label>
                    <Input {...register("adultCount", { required: "This field is required" })} type="number" placeholder="1" min={1} />
                    {errors.adultCount && <span className="text-red-500">{errors.adultCount.message}</span>}
                </div>
                <div>
                    <Label className="text-sm font-semibold flex items-center gap-1">
                        <FaChildren />
                        Children
                    </Label>
                    <Input {...register("childCount", { required: "This field is required" })} type="number" placeholder="0" min={0} />
                    {errors.childCount && <span className="text-red-500">{errors.childCount.message}</span>}
                </div>
            </div>
        </div>
    );
};

export default GuestSection;
