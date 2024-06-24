import { Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import { useAppContext } from "./context/AppContext"
import CreateHotelPage from "./pages/CreateHotelPage"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import SearchPage from "./pages/SearchPage"
import Detail from "./pages/Detail"
import Booking from "./pages/Booking"
import MyReservation from "./pages/MyReservation"
import Home from "./pages/Home"





const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
        <Routes>
          <Route path="/" element={<Layout showHero showSearchBar><Home /></Layout>} />
          <Route path="/register" element={<Layout showHero={false} showSearchBar={false}><Register /></Layout>} />
          <Route path="/sign-in" element={<Layout showHero={false} showSearchBar={false}><SignIn /></Layout>} />
          <Route path="/search" element={<Layout showHero={false} showSearchBar={true}><SearchPage/></Layout>} />
          <Route path="/detail/:hotelId" element=<Layout showHero={false} showSearchBar={false}><Detail/></Layout>/>
          {isLoggedIn && (
            <>
              <Route path="/create-hotel" element={<Layout showHero={false} showSearchBar={false}><CreateHotelPage/></Layout>} />
              <Route path="/my-hotel" element={<Layout showHero={false} showSearchBar={false}><MyHotels/></Layout>} />
              <Route path="/edit-hotel/:hotelId" element={<Layout showHero={false} showSearchBar={false}><EditHotel/></Layout>} />
              <Route path="/hotel/:hotelId/booking" element={<Layout showHero={false} showSearchBar={false}><Booking/></Layout>} />
              <Route path="/my-reservation" element={<Layout showHero={false} showSearchBar={false}><MyReservation /></Layout>} />
            </>
          )}
        </Routes>
  )
}

export default App


