import Hero from "@/components/Hero"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchBar from "@/components/SearchBar"




interface Props {
    children: React.ReactNode
    showHero?: boolean
    showSearchBar?: boolean
}

const Layout = ({children, showHero, showSearchBar}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {showHero && 
      <div className="-mb-10">
       <Hero />
      </div>
      }
      <div className="container mx-auto mt-10">
        {showSearchBar && <SearchBar />}
      </div>
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout