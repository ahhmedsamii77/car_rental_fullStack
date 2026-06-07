import Banner from "../components/Banner";
import Contact from "../components/Contact";
import FeaturedVehicles from "../components/FeaturedVehicles";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedVehicles />
      <Banner />
      <Contact />
    </div>
  )
}
