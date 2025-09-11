import { FaRegListAlt } from "react-icons/fa"
import type { BookingResType } from "../types"
import { ImLocation2 } from "react-icons/im";

export default function BookingCard({ booking, index }: { booking: BookingResType, index: number }) {
  return (
    <div className="shadow rounded-lg p-5 md:flex justify-between items-start space-y-4 md:space-y-0">
      <div className="md:flex items-start gap-6">
        <div>
          <div className="overflow-hidden">
            <img className="w-full md:max-w-80 rounded" src={booking.carId.image.secure_url} alt={booking.carId.description} />
          </div>
          <div className="mt-2">
            <p className="font-medium text-lg">{booking.carId.brand} {booking.carId.model}</p>
            <p className="uppercase text-sm text-gray-500">{booking.carId.year} • {booking.carId.category} • {booking.carId.location} </p>
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="space-x-2">
            <span className="text-xs bg-light px-3 py-1 rounded-lg">Booking #{index + 1}</span>
            <span className={`text-xs px-3 py-1 capitalize rounded-lg ${booking.status == "confirmed" ? " text-green-600 bg-green-400/15" : "text-red-600 bg-red-400/15"}`}>{booking.status}</span>
          </div>
          <ul className="space-y-2 mt-3">
            <li className="flex items-start gap-2">
              <FaRegListAlt className="w-4 h-4 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Rental Period</p>
                <p className="text-sm">{new Date(booking.pickupDate!).toLocaleDateString()} - {new Date(booking.returnDate!).toLocaleDateString()}</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <ImLocation2 className="w-4 h-4 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm capitalize">{booking.carId.location}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-sm md:text-right space-y-1">
        <h4 className="text-gray-500">Total Price</h4>
        <p className="text-primary text-3xl font-semibold">${booking.price}</p>
        <p className="text-gray-500">Booked on {new Date(booking.createdAt!).toLocaleDateString()}</p>
      </div>
    </div>
  )
}
