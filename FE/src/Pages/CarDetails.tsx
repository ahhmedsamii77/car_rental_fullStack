import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useGetCar } from "../lib/queries";
import Loader from "../components/shared/Loader";
import type { CarResType } from "../types";
import { IoCheckmarkDoneCircleOutline, IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import BookingForm from "../components/BookingForm";
import { motion } from "motion/react"
const features = [
  {
    icon: IoCheckmarkDoneCircleOutline,
    name: "360 Camera"
  },
  {
    icon: IoCheckmarkDoneCircleOutline,
    name: "Bluetooth"
  },
  {
    icon: IoCheckmarkDoneCircleOutline,
    name: "GPS"
  },
  {
    icon: IoCheckmarkDoneCircleOutline,
    name: "Heated Seats"
  },
  {
    icon: IoCheckmarkDoneCircleOutline,
    name: "Rear View Mirror"
  }
]

export default function CarDetails() {
  const { carId } = useParams();
  const { data, isLoading } = useGetCar(carId!);
  if (isLoading) {
    return <Loader />;
  }
  const car: CarResType = data?.data.car;
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25 py-7">
        <Link className="flex items-center gap-2 text-gray-500" to="/cars">
          <FaLongArrowAltLeft className="w-5 h-5" />
          <span>Back to all cars</span>
        </Link>
        <div className=" lg:flex gap-10 items-start mt-5">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-[70%]">
            <div className=" border-b border-gray-300 pb-7">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full rounded-lg mb-6 max-h-100 object-cover" src={car.image.secure_url} alt={car.description} />
              <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-lg text-gray-500 uppercase">{car.category} • {car.year}</p>
            </div>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 mt-5 md:grid-cols-4">
              <li className="flex items-center justify-center flex-col bg-gray-100 rounded-lg py-4 ">
                <IoPeopleOutline className="w-6 h-6 text-gray-700" />
                <span>{car.seating_capacity} Seats</span>
              </li>
              <li className="flex items-center justify-center flex-col bg-gray-100 rounded-lg py-4 ">
                <MdOutlineLocalGasStation className="w-6 h-6 text-gray-700" />
                <span>{car.fuel_type}</span>
              </li>
              <li className="flex items-center justify-center flex-col bg-gray-100 rounded-lg py-4 ">
                <LiaCarSideSolid className="w-6 h-6 text-gray-700" />
                <span>{car.transmission}</span>
              </li>
              <li className="flex items-center justify-center flex-col bg-gray-100 rounded-lg py-4 ">
                <CiLocationOn className="w-6 h-6 text-gray-700" />
                <span>{car.location}</span>
              </li>
            </motion.ul>
            <h2 className="text-2xl font-medium mt-5 mb-1">Description</h2>
            <p className="text-gray-500">{car.description}</p>
            <h2 className="text-2xl font-medium mt-5 mb-2">Features</h2>
            <ul className="space-y-1.5">
              {features.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 * index }}
                  viewport={{ once: true }}
                  key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-500">{item.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:w-[30%]">
            <BookingForm car={car} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
