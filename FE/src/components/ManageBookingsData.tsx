import { useState } from "react"
import { useChangeBookingStatus } from "../lib/queries"
import type { BookingResType } from "../types"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast from "react-hot-toast"

export default function ManageBookingsData({ booking }: { booking: BookingResType }) {
  const { mutateAsync: changeBookingStatus } = useChangeBookingStatus()
  const [status, setStatus] = useState(booking.status)

  async function handleChangeStatus(val: string) {
    setStatus(val)
    try {
      await changeBookingStatus({ bookingId: booking._id, status: val })
      toast.success("Status updated")
    } catch {
      toast.error("Something went wrong")
    }
  }

  const statusColor =
    status === "confirmed"
      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      : status === "cancelled"
      ? "bg-red-100 text-red-700 hover:bg-red-100"
      : "bg-amber-100 text-amber-700 hover:bg-amber-100"

  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-[#7C3AED]/5 transition-colors">

      {/* Avatar + Car name */}
      <Avatar className="w-9 h-9 rounded-lg shrink-0">
        <AvatarImage src={booking.carId.image.secure_url} className="object-cover" />
        <AvatarFallback className="rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold">
          {booking.carId.brand?.[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground truncate">
          {booking.carId.brand} {booking.carId.model}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {booking.carId.seating_capacity} seats • {booking.carId.transmission}
        </p>
      </div>

      {/* Dates */}
      <span className="hidden sm:block text-[11px] text-muted-foreground shrink-0">
        {new Date(booking.pickupDate).toLocaleDateString()} → {new Date(booking.returnDate).toLocaleDateString()}
      </span>

      {/* Price */}
      <span className="text-[13px] font-semibold text-[#7C3AED] shrink-0">
        ${booking.price}
      </span>

      {/* Status */}
      <div className="shrink-0">
        {status === "pending" ? (
          <Select value={status} onValueChange={(val) => { if (val) handleChangeStatus(val) }}>
            <SelectTrigger className="w-28 h-7 rounded-xl text-[11px] border-border/60 focus:ring-[#7C3AED] cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="pending" className="cursor-pointer">Pending</SelectItem>
              <SelectItem value="confirmed" className="cursor-pointer">Confirmed</SelectItem>
              <SelectItem value="cancelled" className="cursor-pointer">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge className={`text-[11px] capitalize font-semibold ${statusColor}`}>
            {status}
          </Badge>
        )}
      </div>
    </div>
  )
}
