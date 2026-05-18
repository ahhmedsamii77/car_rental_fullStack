import type { BookingResType } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FiCalendar, FiMapPin, FiHash } from "react-icons/fi"

export default function BookingCard({ booking, index }: { booking: BookingResType; index: number }) {
  const isConfirmed = booking.status === "confirmed"

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Car Image */}
          <div className="md:w-64 h-48 md:h-auto shrink-0 overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              src={booking.carId.image.secure_url}
              alt={booking.carId.description}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden md:block" />
          </div>

          {/* Details */}
          <div className="flex-1 p-5 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-bold text-lg text-foreground">
                  {booking.carId.brand} {booking.carId.model}
                </h3>
                <p className="text-xs text-muted-foreground uppercase mt-0.5">
                  {booking.carId.year} • {booking.carId.category} • {booking.carId.location}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <FiHash className="w-3 h-3" /> Booking #{index + 1}
                </Badge>
                <Badge
                  className={`text-xs capitalize font-semibold ${
                    isConfirmed
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                  }`}
                >
                  {booking.status}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Info row */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                  <FiCalendar className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rental Period</p>
                  <p className="text-sm font-medium">
                    {new Date(booking.pickupDate!).toLocaleDateString()} →{" "}
                    {new Date(booking.returnDate!).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center shrink-0">
                  <FiMapPin className="w-4 h-4 text-[#06B6D4]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pickup Location</p>
                  <p className="text-sm font-medium capitalize">{booking.carId.location}</p>
                </div>
              </div>
            </div>

            {/* Price row */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-auto">
              <p className="text-xs text-muted-foreground">
                Booked on {new Date(booking.createdAt!).toLocaleDateString()}
              </p>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total Price</p>
                <p className="text-2xl font-bold text-[#7C3AED]">${booking.price}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
