import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import DestinationCards from "@/components/DestinationCards";

const Home = () => {
    const { data: hotels } = useQuery("fetchQuery", () =>
        apiClient.fetchHotels()
      );
    
      const topRowHotels = hotels?.slice(0, 2) || [];
      const bottomRowHotels = hotels?.slice(2) || [];
  return (
<div className="space-y-8 p-4 md:p-8">
  <h2 className="text-3xl font-bold text-gray-800">Latest Destinations</h2>
  <p className="text-gray-600">Most recent destinations added by our hosts</p>
  <div className="grid gap-6">
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      {topRowHotels.map((hotel, index) => (
        <DestinationCards key={index} hotel={hotel} />
      ))}
    </div>
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {bottomRowHotels.map((hotel, index) => (
        <DestinationCards key={index} hotel={hotel} />
      ))}
    </div>
  </div>
</div>
  )
}

export default Home
