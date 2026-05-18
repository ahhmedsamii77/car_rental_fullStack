import type { BookingResType } from "../types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RecentBooking({ booking }: { booking: BookingResType }) {
  const isConfirmed = booking.status === "confirmed"
  return (
    <li className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
      <Avatar className="w-11 h-11 rounded-xl shrink-0">
        <AvatarImage src={booking.carId?.image?.secure_url} className="object-cover" />
        <AvatarFallback className="rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold">
          {booking.carId?.brand?.[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">
          {booking.carId?.brand} {booking.carId?.model}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(booking.pickupDate).toLocaleDateString()} → {new Date(booking.returnDate).toLocaleDateString()}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-[#7C3AED]">${booking.price}</p>
        <Badge
          className={`text-xs capitalize mt-1 font-semibold ${
            isConfirmed
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }`}
        >
          {booking.status}
        </Badge>
      </div>
    </li>
  )
}
