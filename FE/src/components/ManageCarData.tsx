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
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-[#7C3AED]/5 transition-colors">

      {/* Avatar + Name */}
      <Avatar className="w-9 h-9 rounded-lg shrink-0">
        <AvatarImage src={car.image.secure_url} className="object-cover" />
        <AvatarFallback className="rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold">
          {car.brand?.[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground truncate">
          {car.brand} {car.model}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {car.seating_capacity} seats • {car.transmission}
        </p>
      </div>

      {/* Category */}
      <span className="hidden sm:block text-[11px] text-muted-foreground capitalize shrink-0">
        {car.category}
      </span>

      {/* Price */}
      <span className="text-[13px] font-semibold text-[#7C3AED] shrink-0">
        ${car.price}<span className="text-muted-foreground font-normal text-[11px]">/day</span>
      </span>

      {/* Status */}
      <Badge
        className={`hidden sm:inline-flex text-[11px] font-semibold shrink-0 ${
          car.isAvailable
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
            : "bg-red-100 text-red-700 hover:bg-red-100"
        }`}
      >
        {car.isAvailable ? "Available" : "Unavailable"}
      </Badge>

      {/* Delete button */}
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-destructive hover:bg-destructive/10 transition-colors cursor-pointer shrink-0"
        aria-label="Delete car"
      >
        <FiTrash2 size={13} />
      </button>

      {/* Confirm Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Car</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{car.brand} {car.model}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCar}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer"
            >
              {isDeleting
                ? <AiOutlineLoading3Quarters className="animate-spin w-4 h-4" />
                : "Delete"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
