import { Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import { useAppContext } from "./context/AppContext"
import CreateHotelPage from "./pages/CreateHotelPage"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import SearchPage from "./pages/SearchPage"




const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
        <Routes>
          <Route path="/" element={<Layout showHero showSearchBar><p>HOme</p></Layout>} />
          <Route path="/register" element={<Layout showHero={false} showSearchBar={false}><Register /></Layout>} />
          <Route path="/sign-in" element={<Layout showHero={false} showSearchBar={false}><SignIn /></Layout>} />
          <Route path="/search" element={<Layout showHero={false} showSearchBar={true}><SearchPage/></Layout>} />
          {isLoggedIn && (
            <>
              <Route path="/create-hotel" element={<Layout showHero={false} showSearchBar={false}><CreateHotelPage/></Layout>} />
              <Route path="/my-hotel" element={<Layout showHero={false} showSearchBar={false}><MyHotels/></Layout>} />
              <Route path="/edit-hotel/:hotelId" element={<Layout showHero={false} showSearchBar={false}><EditHotel/></Layout>} />
            </>
          )}
        </Routes>
  )
}

export default App


