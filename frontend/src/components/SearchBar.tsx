import { useSearchContext } from "@/context/SearchContext";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { MdOutlineTravelExplore } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
    onSubmit={handleSubmit}
    className="-mt-8 p-3 bg-blue-400 rounded-xl shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 sm:grid-cols-1 sm:items-start sm:gap-2 sm:mx-auto"
    >
      <div className="flex items-center flex-1 bg-white rounded px-2">
          <MdOutlineTravelExplore />
          <Input 
          type="text"
          value={destination}
          placeholder="Where do you go?"
          className=" text-md w-full bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0" 
          onChange={(e) => setDestination(e.target.value)}
          />
      </div>

      <div className="flex items-center bg-white rounded px-2">
        <div className="flex items-center flex-1">
          <Label htmlFor="adult" className="flex items-center gap-1"> 
            <BsFillPersonFill />
            Adult:
          </Label>
          <Input 
            type="number"
            id="adult"
            min={1}
            max={20}
            value={adultCount}
            className=" w-full bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0" 
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
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
            value={childCount}
            className=" w-full bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0" 
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            />
        </div>
      </div>

      <div className="flex items-center bg-white rounded px-2">
        <FaCalendarDays />
        <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
        </div>
      </div>

      <div className="flex items-center bg-white rounded px-2">
        <FaCalendarDays />
        <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
        </div>
      </div>
      <div className="flex gap-1" >
        <Button className="w-full gap-1">
          <span>
            Search
          </span>
          <CiSearch />
        </Button>
        <Button 
        variant="destructive"
        className="w-full gap-1"
        >
          <span>
            Clear
          </span>
        <MdDelete />
        </Button>
      </div>
    </form>
  )
}

export default SearchBar
