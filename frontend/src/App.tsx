import { Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import { useAppContext } from "./context/AppContext"
import CreateHotel from "./pages/CreateHotel"



const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
        <Routes>
          <Route path="/" element={<Layout showHero><p>HOme</p></Layout>} />
          <Route path="/register" element={<Layout showHero={false}><Register /></Layout>} />
          <Route path="/sign-in" element={<Layout showHero={false}><SignIn /></Layout>} />

          {isLoggedIn && (
            <>
              <Route path="/create-hotel" element={<Layout showHero={false}><CreateHotel /></Layout>} />
            </>
          )}
        </Routes>
  )
}

export default App


