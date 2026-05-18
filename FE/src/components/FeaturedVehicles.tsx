import { useState } from "react"
import { useGetCars } from "../lib/queries"
import type { CarResType } from "../types"
import CarCard from "./CarCard"
import Loader from "./shared/Loader"
import Title from "./shared/Title"
import { Button } from "@/components/ui/button"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { motion } from "motion/react"

export default function FeaturedVehicles() {
  const [page, setPage] = useState(1)
  const limit = 6
  const { data, isLoading, error } = useGetCars({ page, limit })

  if (isLoading) return <Loader />
  if (error) console.log(error)

  const cars: CarResType[] = data?.data.cars ?? []
  const total: number      = data?.data.total ?? 0
  const totalPages = Math.ceil(total / limit)

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
        <div className="text-center mb-12">
          <Title
            title="Featured Vehicles"
            description="Explore our premium fleet — from sporty coupes to spacious SUVs."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/10 cursor-pointer"
            >
              <FiChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || cars.length < limit}
              className="rounded-full border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/10 cursor-pointer"
            >
              Next <FiChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
