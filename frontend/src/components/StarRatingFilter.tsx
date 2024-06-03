import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const StarRatingFilter = ({selectedStars, onChange}: Props) => {
    const num = ["5", "4", "3", "2", "1"];
  return (
    <div className="border-b border-slate-300 pb-5">
       <h4 className="text-md font-semibold mb-2">Property Rating</h4>
        {num.map((star) => (
            <div className="flex gap-7 space-y-2">
                <Label htmlFor="ratingStar" className="flex items-center space-x-2">{star} Stars</Label>
                <Input 
                id="ratingStar"
                type="checkbox"
                className="h-7 w-7 rounded-lg"
                value={star}
                checked={selectedStars.includes(star)}
                onChange={onChange}
                />
            </div>            
        ))}
    </div>
  )
}

export default StarRatingFilter
