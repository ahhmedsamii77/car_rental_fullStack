import { Link } from "react-router-dom";
import Banner_Car from "../assets/banner_car_image.png"
import { motion } from "motion/react"
export default function Banner() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full my-20">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25">
        <div className="bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white p-7 rounded-xl md:gap-4 md:flex justify-between">
          <div className="md:w-[60%] lg:w-1/2">
            <h3 className="text-3xl font-semibold mb-2">Do You Own a Luxury Car?</h3>
            <p className="">Monetize your vehicle effortlessly by listing it on CarRental.</p>
            <p className="">We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.</p>
            <Link className="text-primary bg-white hover:scale-105 hover:text-primary-dull transition px-3 py-2 rounded-md mt-5 inline-block text-sm" to="/cars">List Your Car</Link>
          </div>
          <div className="mt-6 md:w-[40%] lg:w-1/2 self-end">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-[400px] mx-auto w-full" src={Banner_Car} alt="car" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
