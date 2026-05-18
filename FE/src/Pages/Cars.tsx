import { CiSearch } from "react-icons/ci"
import CarCard from "../components/CarCard"
import Loader from "../components/shared/Loader"
import Title from "../components/shared/Title"
import { useGetAvailableCars, useGetCars } from "../lib/queries"
import type { CarResType } from "../types"
import { useContext } from "react"
import useDebounce from "../utils/hooks/useDebounce"
import { authContext } from "../context/authContext"
import { useSearchParams } from "react-router-dom"
import { motion } from "motion/react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Cars() {
  const { query, setQuery } = useContext(authContext)!
  const debounceValue = useDebounce({ value: query, delay: 500 })
  const { data, isLoading } = useGetCars({ limit: 500, query: debounceValue })
  const [searchParams] = useSearchParams()
  const location   = searchParams.get("location")!
  const pickupDate = searchParams.get("pickupDate")!
  const returnDate = searchParams.get("returnDate")!
  const { data: availableCars, isLoading: availableCarsLoading } = useGetAvailableCars({ location, pickupDate, returnDate })

  if (isLoading || availableCarsLoading) return <Loader />

  const cars: CarResType[] = availableCars?.data?.availableCars || data?.data?.cars || []

  return (
    <section className="min-h-screen">
      {/* Hero banner */}
      <div className="gradient-hero w-full py-16 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#06B6D4]/10 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 lg:px-8 2xl:px-20 relative z-10"
        >
          <Title
            title="Available Cars"
            description="Browse our premium fleet — find your perfect ride for any occasion."
          />
          {/* Search bar */}
          <div className="relative mx-auto mt-6 max-w-md">
            <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make or model…"
              className="pl-11 h-12 rounded-full bg-white shadow-sm border-border/60 text-sm focus-visible:ring-[#7C3AED]"
            />
          </div>
        </motion.div>
      </div>

      {/* Cars grid */}
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20 py-10">
        <div className="flex items-center gap-3 mb-6">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-semibold text-foreground">{cars.length}</span> cars
          </p>
          {location && (
            <Badge variant="secondary" className="text-xs">
              📍 {location}
            </Badge>
          )}
          {pickupDate && returnDate && (
            <Badge variant="secondary" className="text-xs">
              📅 {new Date(pickupDate).toLocaleDateString()} → {new Date(returnDate).toLocaleDateString()}
            </Badge>
          )}
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-3">🚗</p>
            <h2 className="text-xl font-bold text-foreground mb-2">No cars found</h2>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cars.map((car) => <CarCard key={car._id} car={car} />)}
          </motion.div>
        )}
      </div>
    </section>
  )
}
