import { FaRegRectangleList } from "react-icons/fa6";
import type { BookingResType } from "../types";

export default function RecentBooking({ booking }: { booking: BookingResType }) {
  console.log(booking)
  return (
    <li className="flex items-start justify-between">
      <div className="flex items-start gap-2">
        <div className="text-primary bg-blue-400/15 rounded-full p-2 w-fit">
          <FaRegRectangleList className="w-4 h-4 " />
        </div>
        <div>
          <p>{booking.carId.brand} {booking.carId.model}</p>
          <p className="text-sm text-gray-500">{new Date(booking.pickupDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-gray-500 text-sm">${booking.price}</p>
        <p className="px-3 py-1 border border-gray-300/90 text-sm rounded-full capitalize">{booking.status}</p>
      </div>
    </li>
  )
}
