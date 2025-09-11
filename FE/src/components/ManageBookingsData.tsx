import { useState } from "react";
import { useChangeBookingStatus } from "../lib/queries";
import type { BookingResType } from "../types";

export default function ManageBookingsData({ booking }: { booking: BookingResType }) {
  const { mutateAsync: changeBookingStatus } = useChangeBookingStatus();
  const [status, setstatus] = useState(booking.status);
  async function handleChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setstatus(e.target.value);
    try {
      const res = await changeBookingStatus({ bookingId: booking._id, status: e.target.value });
      console.log(res?.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <tr className="border-t border-gray-500/20">
      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
        <div className="rounded overflow-hidden">
          <img src={booking.carId.image.secure_url} alt={booking.carId.description} className="w-full h-14 object-cover aspect-square" />
        </div>
        <div className="max-md:hidden">
          <p className="font-medium">{booking.carId.brand} {booking.carId.model}</p>
          <p className="font-medium text-xs text-gray-500">{booking.carId.seating_capacity} • {booking.carId.transmission}</p>
        </div>
      </td>
      <td className="px-4 py-3 max-md:hidden">
        {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">${booking.price}</td>
      <td className="px-4 py-3">
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full  max-md:hidden">Offline</span>
      </td>
      <td className="px-4 py-3">
        {booking.status == "pending" ? <select value={status} onChange={handleChangeStatus} className="w-fit! border border-gray-300/90 px-3 py-1 rounded-md" name="status">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select> : <span className="text-xs bg-gray-100 px-3 py-1 font-semibold rounded-full">{booking.status}</span>}
      </td>
    </tr>
  )
}
