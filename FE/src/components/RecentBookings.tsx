import type { BookingResType } from "../types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RecentBooking({ booking }: { booking: BookingResType }) {
  const isConfirmed = booking.status === "confirmed"
  return (
    <tr className="group border-b border-border/50 last:border-0 transition-colors">
      <td className="px-4 py-3 group-hover:bg-[#7C3AED]/5 transition-colors">
        <div className="flex items-center gap-3">
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
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground group-hover:bg-[#7C3AED]/5 transition-colors">
        {new Date(booking.pickupDate).toLocaleDateString()} → {new Date(booking.returnDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-sm font-bold text-[#7C3AED] group-hover:bg-[#7C3AED]/5 transition-colors">${booking.price}</td>
      <td className="px-4 py-3 group-hover:bg-[#7C3AED]/5 transition-colors">
        <Badge
          className={`text-xs capitalize font-semibold ${
            isConfirmed
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }`}
        >
          {booking.status}
        </Badge>
      </td>
    </tr>
  )
}
