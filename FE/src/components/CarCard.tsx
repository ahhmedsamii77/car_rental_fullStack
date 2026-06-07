import { Link } from "react-router-dom"
import type { CarResType } from "../types"
import { IoMdPeople } from "react-icons/io"
import { MdLocalGasStation } from "react-icons/md"
import { FaCarSide, FaLocationDot } from "react-icons/fa6"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "motion/react"

export default function CarCard({ car }: { car: CarResType }) {
  return (
    
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }}>
      <Link to={`/carDetails/${car._id}`}>
        <Card className="overflow-hidden shadow-sm hover:shadow-violet group cursor-pointer border-border/60 transition-shadow duration-300 h-full">
          {/* Image */}
          <div className="relative overflow-hidden h-52">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={car.image.secure_url}
              alt={car.category}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Badges */}
            <Badge
              className={`absolute top-3 left-3 text-xs font-semibold ${
                !car.isAvailable
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : car.hasActiveBookings
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
            >
              {!car.isAvailable
                ? "Unavailable"
                : car.hasActiveBookings
                ? "Booked"
                : "Available"}
            </Badge>

            {/* Price tag */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
              <span className="text-[#7C3AED]">${car.price_per_day}</span>
              <span className="text-slate-400 font-normal text-xs">/day</span>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            {/* Name & category */}
            <div>
              <h3 className="font-bold text-base capitalize text-foreground">
                {car.brand} {car.model}
              </h3>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {car.category} • {car.year}
              </p>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { icon: IoMdPeople,         label: `${car.seating_capacity} Seats`,  color: "text-[#7C3AED]" },
                { icon: MdLocalGasStation,  label: car.fuel_type,                   color: "text-[#F59E0B]" },
                { icon: FaCarSide,          label: car.transmission,                color: "text-[#06B6D4]" },
                { icon: FaLocationDot,      label: car.location,                    color: "text-[#10B981]" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} />
                  <span className="text-xs capitalize truncate">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA bar */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <span className="text-xs text-muted-foreground">Tap to view details</span>
              <span className="text-xs font-semibold text-[#7C3AED] group-hover:underline">Book Now →</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
