import StarRatingFilter from "@/components/StarRatingFilter"
import { useSearchContext } from "@/context/SearchContext";
import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import HotelTypeFilter from "@/components/HotelTypeFilter";
import FacilitiesFilter from "@/components/FacilitiesFilter";
import PriceFilter from "@/components/PriceFilter";


const SearchPage = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
      destination: search.destination,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelTypes,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOption,
    };

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
      apiClient.searchHotels(searchParams)
    );
  
    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const starRating = event.target.value;
  
      setSelectedStars((prevStars) =>
        event.target.checked
          ? [...prevStars, starRating]
          : prevStars.filter((star) => star !== starRating)
      );
    };

    const handleHotelTypeChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const hotelType = event.target.value;
  
      setSelectedHotelTypes((prevHotelTypes) =>
        event.target.checked
          ? [...prevHotelTypes, hotelType]
          : prevHotelTypes.filter((hotel) => hotel !== hotelType)
      );
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const facility = event.target.value;
  
      setSelectedFacilities((prevFacilities) =>
        event.target.checked
          ? [...prevFacilities, facility]
          : prevFacilities.filter((prevFacility) => prevFacility !== facility)
      );
    };
  
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div className="rounded-lg border border-slate-400 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-500">Filter By:</h3>
          <StarRatingFilter 
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypeFilter 
          selectedHotelTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter 
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter 
          selectedPrice={selectedPrice} 
          onChange={(value?:number) => setSelectedPrice(value)}
        />
        </div>
        
      </div>

      <div>
      Search
      </div>
    </div>
  )
}

export default SearchPage
