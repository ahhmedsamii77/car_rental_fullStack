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
    <tr className="border-b border-border last:border-0 hover:bg-[#7C3AED]/5 transition-colors">
      {/* Car */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 rounded-lg shrink-0">
            <AvatarImage src={booking.carId.image.secure_url} className="object-cover" />
            <AvatarFallback className="rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] text-xs">
              {booking.carId.brand?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="font-semibold text-sm">{booking.carId.brand} {booking.carId.model}</p>
            <p className="text-xs text-muted-foreground">{booking.carId.seating_capacity} seats • {booking.carId.transmission}</p>
          </div>
        </div>
      </td>

      {/* Dates */}
      <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground">
        {new Date(booking.pickupDate).toLocaleDateString()} → {new Date(booking.returnDate).toLocaleDateString()}
      </td>

      {/* Price */}
      <td className="px-4 py-3 font-semibold text-[#7C3AED]">${booking.price}</td>

      {/* Payment */}
      <td className="px-4 py-3 hidden md:table-cell">
        <Badge variant="outline" className="text-xs">Offline</Badge>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        {status === "pending" ? (
          <Select value={status} onValueChange={(val) => { if (val) handleChangeStatus(val) }}>
            <SelectTrigger className="w-32 h-8 rounded-xl text-xs border-border/60 focus:ring-[#7C3AED]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge className={`text-xs capitalize font-semibold ${statusColor}`}>{status}</Badge>
        )}
      </td>
    </tr>
  )
}
