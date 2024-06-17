import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { useSearchContext } from "@/context/SearchContext";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { BsFillPersonFill } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaChild } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

type Props = {
    hotelId: string;
    pricePerNight: number;
  };
  
  type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
  };

const GuetsForm = ({hotelId, pricePerNight}: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          ${pricePerNight} /
          <span className="ml-1 text-xl font-semibold text-neutral-500">Night</span>
        </div>
      </div>
      <Separator className="border-neutral-200" />
      <form         
      onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }>
        <div className="grid grid-cols-1 gap-4 p-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-full p-2 bg-white border border-neutral-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
              wrapperClassName="w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full p-2 bg-white border border-neutral-200 rounded focus:outline-none focus:ring focus:ring-blue-500"
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex items-center gap-4 border rounded-sm">
            <div className="flex items-center flex-1 ml-1">
              <Label htmlFor="adult" className="flex items-center gap-1">
                <BsFillPersonFill />
                Adult:
              </Label>
              <Input
                type="number"
                id="adult"
                min={1}
                max={20}
                className="w-full bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex items-center flex-1">
              <Label htmlFor="child" className="flex items-center gap-1">
                <FaChild />
                Child:
              </Label>
              <Input
                type="number"
                id="child"
                min={0}
                max={20}
                className="w-full bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>

            {isLoggedIn ? (
              <Button>
                Booking Now
              </Button>
            ) : (
              <Button>
                Sign In First
              </Button>
            )
            }
        </div>
      </form>
    </div>
  )
}

export default GuetsForm
