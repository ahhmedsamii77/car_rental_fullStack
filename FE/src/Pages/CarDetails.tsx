import { Link, useParams } from "react-router-dom"
import { useGetCar } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { CarResType } from "../types"
import BookingForm from "../components/BookingForm"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FiArrowLeft } from "react-icons/fi"
import { IoPeopleOutline } from "react-icons/io5"
import { MdOutlineLocalGasStation } from "react-icons/md"
import { LiaCarSideSolid } from "react-icons/lia"
import { CiLocationOn } from "react-icons/ci"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"

const features = [
  "360° Camera", "Bluetooth", "GPS Navigation",
  "Heated Seats", "Rear View Camera", "Apple CarPlay",
]

const specs = [
  { icon: IoPeopleOutline,        key: "seating_capacity", suffix: " Seats", color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
  { icon: MdOutlineLocalGasStation, key: "fuel_type",      suffix: "",       color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { icon: LiaCarSideSolid,        key: "transmission",     suffix: "",       color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
  { icon: CiLocationOn,           key: "location",         suffix: "",       color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
] as const

export default function CarDetails() {
  const { carId } = useParams()
  const { data, isLoading } = useGetCar(carId!)
  if (isLoading) return <Loader />
  const car: CarResType = data?.data.car

  return (
    <section className="w-full py-10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20 py-6">
        {/* Back */}
        <Link to="/cars">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground mb-6 cursor-pointer -ml-2">
            <FiArrowLeft className="w-4 h-4" /> Back to all cars
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left: car details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-violet">
              <img
                className="w-full max-h-[420px] object-cover"
                src={car.image.secure_url}
                alt={car.description}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <Badge className="absolute top-4 left-4 bg-white/90 text-[#7C3AED] border-0 font-semibold shadow">
                {car.isAvailable ? "✓ Available" : "✗ Unavailable"}
              </Badge>
            </div>

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold tracking-tight">{car.brand} {car.model}</h1>
              <p className="text-muted-foreground uppercase text-sm mt-1 tracking-wider">
                {car.category} • {car.year}
              </p>
            </div>

            <Separator className="mb-5" />

            {/* Specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {specs.map(({ icon: Icon, key, suffix, color, bg }) => (
                <div key={key} className={`${bg} rounded-2xl p-4 flex flex-col items-center gap-2`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                  <span className="text-sm font-medium capitalize text-center">
                    {car[key]}{suffix}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{car.description}</p>

            {/* Features */}
            <h2 className="text-xl font-bold mb-3">Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 bg-[#7C3AED]/5 rounded-xl px-3 py-2"
                >
                  <IoCheckmarkDoneCircleOutline className="w-4 h-4 text-[#7C3AED] shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: booking form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full lg:w-[360px] shrink-0"
          >
            <BookingForm car={car} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
