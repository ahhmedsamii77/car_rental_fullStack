import { useState } from "react"
import type { CarResType } from "../types"
import { useDeleteCar } from "../lib/queries"
import toast from "react-hot-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FiTrash2 } from "react-icons/fi"

export default function ManageCarData({ car }: { car: CarResType }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen]             = useState(false)
  const { mutateAsync: deleteCar }  = useDeleteCar()

  async function handleDeleteCar() {
    setIsDeleting(true)
    try {
      await deleteCar(car._id)
      toast.success("Car deleted successfully")
      setOpen(false)
    } catch {
      toast.error("Something went wrong")
    }
    setIsDeleting(false)
  }

  return (
    <tr className="group border-b border-border last:border-0 transition-colors">
      {/* Car */}
      <td className="px-4 py-3 group-hover:bg-[#7C3AED]/5 transition-colors">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 rounded-lg shrink-0">
            <AvatarImage src={car.image.secure_url} className="object-cover" />
            <AvatarFallback className="rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] text-xs">
              {car.brand?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="font-semibold text-sm">{car.brand} {car.model}</p>
            <p className="text-xs text-muted-foreground">{car.seating_capacity} seats • {car.transmission}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground capitalize group-hover:bg-[#7C3AED]/5 transition-colors">{car.category}</td>

      {/* Price */}
      <td className="px-4 py-3 font-semibold text-[#7C3AED] group-hover:bg-[#7C3AED]/5 transition-colors">
        ${car.price}<span className="text-muted-foreground font-normal text-xs">/day</span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 hidden md:table-cell group-hover:bg-[#7C3AED]/5 transition-colors">
        <Badge
          className={`text-xs font-semibold ${
            car.isAvailable
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }`}
        >
          {car.isAvailable ? "Available" : "Unavailable"}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right group-hover:bg-[#7C3AED]/5 transition-colors">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors"
          aria-label="Delete car"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-2xl max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete Car</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{car.brand} {car.model}</strong>? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl cursor-pointer">Cancel</Button>
              <Button
                onClick={handleDeleteCar}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer"
              >
                {isDeleting ? <AiOutlineLoading3Quarters className="animate-spin w-4 h-4" /> : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
