import Banner from "../components/Banner";
import Contact from "../components/Contact";
import FeaturedVehicles from "../components/FeaturedVehicles";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedVehicles />
      <Banner />
      <Testimonial />
      <Contact />
    </div>
  )
}
