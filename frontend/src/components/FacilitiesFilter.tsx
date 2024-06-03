import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { facilityTypes } from "@/config/Options";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const FacilitiesFilter = ({selectedFacilities, onChange}: Props) => {
  return (
    <div className="border-b border-slate-400 pb-5">
    <h4 className="text-md font-semibold mb-2">Facility</h4>
    {facilityTypes.map((facility) => (
        <div className="grid grid-cols-2 items-center gap-7 space-y-2">
            <Label htmlFor="facilitiesType">{facility}</Label>
            <Input 
            id="facilitiesType"
            type="checkbox"
            className="h-7 w-7 rounded-lg"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
            />
        </div>
    ))}
    </div>
  )
}

export default FacilitiesFilter
