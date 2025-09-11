import BookingInput from "./BookingInput";
import Title from "./shared/Title";
import Hero_Car from "../assets/main_car.png"
import { motion } from "motion/react"
export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=" bg-light w-full">
      <div className="container flex flex-col items-center mx-auto px-8 md:px-10 md:pt-20 lg:px-12 2xl:px-20 pt-10 pb-10 ">
        <Title title={"Luxury cars on Rent"} />
        <BookingInput />
        <div className="mt-7">
          <motion.img
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl" src={Hero_Car} alt="car rental" />
        </div>
      </div>
    </motion.section >
  )
}
