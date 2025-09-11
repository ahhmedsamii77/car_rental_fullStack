import { useState } from "react";
import type { CarResType } from "../types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDeleteCar } from "../lib/queries";
import toast from "react-hot-toast";

export default function ManageCarData({ car }: { car: CarResType }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutateAsync: deleteCar } = useDeleteCar();
  async function handleDeleteCar(carId: string) {
    setIsDeleting(true)
    try {
      await deleteCar(carId);
      toast.success("Car deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsDeleting(false)
  }
  return (
    <tr className="border-t border-gray-500/20">
      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
        <div className="rounded overflow-hidden">
          <img src={car.image.secure_url} alt={car.description} className="w-full h-14 object-cover aspect-square" />
        </div>
        <div className="max-md:hidden">
          <p className="font-medium">{car.brand} {car.model}</p>
          <p className="font-medium text-xs text-gray-500">{car.seating_capacity} • {car.transmission}</p>
        </div>
      </td>
      <td className="px-4 py-3 max-md:hidden">
        {car.category}
      </td>
      <td className="px-4 py-3">${car.price}/day</td>
      <td className="px-4 py-3 max-md:hidden">
        <span className={`${car.isAvailable ? "text-green-500 bg-green-100 " : "text-red-500 b-red-100"} rounded-full text-xs px-2 py-1`}>{car.isAvailable ? "Available" : "Unavailable"}</span>
      </td>
      <td className="px-4 py-3">
        <button onClick={() => handleDeleteCar(car._id)}>
          {isDeleting && <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />}
          {!isDeleting && <MdDelete className="w-5 h-5 cursor-pointer hover:text-red-500" />}
        </button>
      </td>
    </tr>
  )
}
