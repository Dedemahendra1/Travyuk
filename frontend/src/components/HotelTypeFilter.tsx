import { hotelTypes } from "@/config/Options"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const HotelTypeFilter = ({selectedHotelTypes, onChange}: Props) => {
  return (
    <div className="border-b border-slate-400 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {hotelTypes.map((hotelType) => (
            <div className="grid grid-cols-2 items-center gap-7 space-y-2">
                <Label htmlFor="hotelType">{hotelType}</Label>
                <Input 
                id="hotelType"
                type="checkbox"
                className="h-7 w-7 rounded-lg"
                value={hotelType}
                checked={selectedHotelTypes.includes(hotelType)}
                onChange={onChange}
                />
            </div>
        ))}
    </div>
  )
}

export default HotelTypeFilter
