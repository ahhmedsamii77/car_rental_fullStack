import { CiSearch } from "react-icons/ci";
import CarCard from "../components/CarCard";
import Loader from "../components/shared/Loader";
import Title from "../components/shared/Title";
import { useGetAvailableCars, useGetCars } from "../lib/queries";
import type { CarResType } from "../types";
import { useContext } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import { authContext } from "../context/authContext";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react"

export default function Cars() {
  const { query, setQuery } = useContext(authContext)!;
  const debounceValue = useDebounce({ value: query, delay: 500 });
  const { data, isLoading } = useGetCars({ limit: 500, query: debounceValue });
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location")!;
  const pickupDate = searchParams.get("pickupDate")!;
  const returnDate = searchParams.get("returnDate")!;
  const { data: availableCars, isLoading: availableCarsLoading } = useGetAvailableCars({ location, pickupDate, returnDate });
  if (isLoading || availableCarsLoading) {
    return <Loader />;
  }
  const cars: CarResType[] = availableCars?.data?.availableCars || data?.data?.cars;
  return (
    <section className="min-h-screen">
      <div className="bg-light w-full text-center py-15">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 lg:px-8 2xl:px-25">
          <Title title="Available Cars" description="Browse our selection of premium vehicles available for your next adventure" />
          <div
            className="flex mx-auto mt-5 items-center shadow pl-4 gap-2 bg-white  h-[46px] rounded-full overflow-hidden max-w-lg w-full">
            <CiSearch className="w-5 h-5 text-gray-500" />
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search by make or model" className="w-full placeholder:text-base placeholder:text-gray-400/90 placeholder:font-normal h-full outline-none text-gray-500 bg-white text-sm" />
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25 py-7">
        <p className="text-gray-500 my-3">Showing {cars.length} Cars</p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => <CarCard key={car._id} car={car} />)}
        </motion.div>
      </div>
    </section>
  )
}
