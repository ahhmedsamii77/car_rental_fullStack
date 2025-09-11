import { useState } from "react";
import { useGetCars } from "../lib/queries";
import type { CarResType } from "../types";
import CarCard from "./CarCard";
import Loader from "./shared/Loader";
import Title from "./shared/Title";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "motion/react";
export default function FeaturedVehicles() {
  const [page, setPage] = useState(1);
  let limit = 6;
  const { data, isLoading , error } = useGetCars({ page, limit });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    console.log(error)
  }
  const cars: CarResType[] = data?.data.cars;
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full py-10">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25 py-7">
        <div className="text-center">
          <Title title="Featured Vehicles" description="Explore our selection of premium vehicles available for your next adventure." />
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {cars?.map(car => <CarCard key={car._id} car={car} />)}
        </motion.div>
      </div>
      <div className="flex items-center  justify-center">
        <button onClick={() => setPage(page - 1)} className="flex items-center hover:bg-gray-100 transition gap-2 mx-auto mt-10 cursor-pointer border border-gray-400/60 px-8 py-2 rounded-lg ">
          <FaLongArrowAltLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button onClick={() => setPage(page + 1)} className="flex items-center hover:bg-gray-100 transition gap-2 mx-auto mt-10 cursor-pointer border border-gray-400/60 px-8 py-2 rounded-lg ">
          <span>Next</span>
          <FaLongArrowAltRight className="w-5 h-5" />
        </button>
      </div>
    </motion.section>
  )
}
