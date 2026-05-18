import { useFormik } from "formik"
import type { BookingType, CarResType } from "../types"
import { ClipLoader } from "react-spinners"
import * as yup from "yup"
import { useCreateBooking } from "../lib/queries"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FiCalendar, FiShield } from "react-icons/fi"
import { FaTag } from "react-icons/fa"

export default function BookingForm({ car }: { car: CarResType }) {
  const navigate = useNavigate()
  const { mutateAsync: createBooking } = useCreateBooking()

  const initialValues: BookingType = { pickupDate: "", returnDate: "", carId: car._id }

  async function onSubmit(values: BookingType) {
    try {
      const res = await createBooking(values)
      toast.success(res?.data.message)
      navigate("/myBookings")
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err?.response?.data?.message ?? "Booking failed")
    }
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      pickupDate: yup.string().required("Pickup date is required"),
      returnDate: yup.string().required("Return date is required"),
    }),
  })

  return (
    <Card className="border-border/60 shadow-violet sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#7C3AED]">${car.price}</span>
            <span className="text-muted-foreground text-sm">/day</span>
          </div>
          <span className="inline-flex items-center gap-1 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full">
            <FaTag className="w-3 h-3" /> Best Price
          </span>
        </div>
        <p className="text-xs text-muted-foreground">All taxes and fees included</p>
      </CardHeader>

      <Separator />

      <CardContent className="pt-5">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Pickup Date */}
          <div className="space-y-1.5">
            <Label htmlFor="pickupDate" className="text-sm font-medium flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#7C3AED]" /> Pickup Date
            </Label>
            <input
              type="date"
              id="pickupDate"
              value={formik.values.pickupDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-xl border border-border px-3 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 transition"
            />
            {formik.touched.pickupDate && formik.errors.pickupDate && (
              <p className="text-destructive text-xs">{formik.errors.pickupDate}</p>
            )}
          </div>

          {/* Return Date */}
          <div className="space-y-1.5">
            <Label htmlFor="returnDate" className="text-sm font-medium flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#06B6D4]" /> Return Date
            </Label>
            <input
              type="date"
              id="returnDate"
              value={formik.values.returnDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-xl border border-border px-3 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 transition"
            />
            {formik.touched.returnDate && formik.errors.returnDate && (
              <p className="text-destructive text-xs">{formik.errors.returnDate}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            className="w-full gradient-primary text-white rounded-xl h-11 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {formik.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Book Now →"}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FiShield className="w-3.5 h-3.5 text-[#10B981]" />
          No credit card required to reserve
        </div>
      </CardContent>
    </Card>
  )
}
