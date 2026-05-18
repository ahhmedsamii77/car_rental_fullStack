import { useFormik } from "formik"
import type { BookingType, CarResType } from "../types"
import { ClipLoader } from "react-spinners"
import * as yup from "yup"
import { useCreateBooking } from "../lib/queries"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { authContext } from "../context/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FiCalendar, FiShield, FiLock } from "react-icons/fi"
import { FaTag } from "react-icons/fa"
import Modal from "./Modal"

export default function BookingForm({ car }: { car: CarResType }) {
  const navigate = useNavigate()
  const { accessToken } = useContext(authContext)!
  const { mutateAsync: createBooking } = useCreateBooking()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const initialValues: BookingType = { pickupDate: "", returnDate: "", carId: car._id }

  async function onSubmit(values: BookingType) {
    // Guard: require auth before booking
    if (!accessToken) {
      setShowAuthModal(true)
      return
    }
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
    <>
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
          {/* Not logged in banner */}
          {!accessToken && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
              <FiLock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Sign in to book</p>
                <p className="text-xs text-amber-600">You can browse freely — login required to reserve.</p>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="ml-auto text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer shrink-0"
              >
                Login →
              </button>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Pickup Date */}
            <div className="space-y-1.5">
              <Label htmlFor="pickupDate" className="text-sm font-medium flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5 text-[#7C3AED]" /> Pickup Date
              </Label>
              <Input
                type="date"
                id="pickupDate"
                value={formik.values.pickupDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-xl focus-visible:ring-[#7C3AED]"
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
              <Input
                type="date"
                id="returnDate"
                value={formik.values.returnDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-xl focus-visible:ring-[#7C3AED]"
              />
              {formik.touched.returnDate && formik.errors.returnDate && (
                <p className="text-destructive text-xs">{formik.errors.returnDate}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={formik.isSubmitting || (!accessToken ? false : (!formik.isValid || !formik.dirty))}
              className="w-full gradient-primary text-white rounded-xl h-11 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {formik.isSubmitting ? (
                <ClipLoader color="#fff" size={18} />
              ) : !accessToken ? (
                <><FiLock className="w-4 h-4 mr-1" /> Login to Book</>
              ) : (
                "Book Now →"
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <FiShield className="w-3.5 h-3.5 text-[#10B981]" />
            No credit card required to reserve
          </div>
        </CardContent>
      </Card>

      {/* Auth modal triggered when unauthenticated user tries to book */}
      {showAuthModal && <Modal setShowModal={setShowAuthModal} />}
    </>
  )
}
