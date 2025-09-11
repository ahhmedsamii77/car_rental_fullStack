import { Link } from "react-router-dom";
import type { CarResType } from "../types";
import { IoMdPeople } from "react-icons/io";
import { MdLocalGasStation } from "react-icons/md";
import { FaCarSide, FaLocationDot } from "react-icons/fa6";

export default function CarCard({ car }: { car: CarResType }) {
  return (
    <Link to={`/carDetails/${car._id}`} className="rounded-lg shadow-lg overflow-hidden group hover:-translate-y-1.5 transition duration-400">
      <div className="relative">
        <img className="w-full h-52 object-cover group-hover:scale-105  transition duration-400" src={car.image.secure_url} alt={car.category} />
        <span className="text-xs text-white bg-primary px-2 py-1 absolute top-3 left-2 rounded-full">{car.isAvailable ? "Available" : "Unavailable"}</span>
        <span className=" text-white px-3 py-2 absolute bottom-3 right-2 rounded-lg bg-black">${car.price}<span className="text-gray-400">/day</span></span>
      </div>
      <div className="p-3 space-y-4">
        <div>
          <p className="font-medium text-lg capitalize">{car.brand} {car.model}</p>
          <p className="text-sm text-gray-900 capitalize">{car.category} • {car.year}</p>
        </div>
        <ul className="text-gray-500 grid grid-cols-2 gap-2 space-y-1">
          <li className="flex items-center gap-3 text-sm ">
            <IoMdPeople className="w-5 h-5" />
            <span>{car.seating_capacity} Seats</span>
          </li>
          <li className="flex items-center gap-3 text-sm capitalize">
            <MdLocalGasStation className="w-5 h-5" />
            <span>{car.fuel_type}</span>
          </li>
          <li className="flex items-center gap-3 text-sm capitalize">
            <FaCarSide className="w-5 h-5" />
            <span>{car.transmission}</span>
          </li>
          <li className="flex items-center gap-3 text-sm capitalize">
            <FaLocationDot className="w-5 h-5" />
            <span>{car.location}</span>
          </li>
        </ul>
      </div>
    </Link>
  )
}
