import Hero from "@/components/Hero"
import Footer from "../components/Footer"
import Header from "../components/Header"




interface Props {
    children: React.ReactNode
    showHero?: boolean
}

const Layout = ({children, showHero}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero  && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout