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
import { FiCalendar, FiShield, FiLock, FiAlertCircle } from "react-icons/fi"
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

  // ── Live price preview (mirrors backend logic exactly) ──────────────────
  const { pickupDate, returnDate } = formik.values
  let days = 0
  let totalPrice = 0
  let isSameDay = false

  if (pickupDate && returnDate) {
    const picked   = new Date(pickupDate)
    const returned = new Date(returnDate)
    const diffMs   = returned.getTime() - picked.getTime()
    days       = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
    totalPrice = car.price_per_day * days
    isSameDay  = diffMs === 0
  }
  // ────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Card className="border-border/60 shadow-violet lg:sticky lg:top-24">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#7C3AED]">${car.price_per_day}</span>
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
          {/* Currently booked banner */}
          {car.hasActiveBookings && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
              <FiAlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">This car is currently booked</p>
                <p className="text-xs text-amber-600 mt-0.5">
                  It has an active reservation. Please check back later or browse other cars.
                </p>
              </div>
            </div>
          )}

          {/* Not logged in banner */}
          {!accessToken && !car.hasActiveBookings && (
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
                min={new Date().toISOString().split("T")[0]}
                value={formik.values.pickupDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!car.hasActiveBookings}
                className="rounded-xl focus-visible:ring-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed"
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
                min={formik.values.pickupDate || new Date().toISOString().split("T")[0]}
                value={formik.values.returnDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!car.hasActiveBookings}
                className="rounded-xl focus-visible:ring-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {formik.touched.returnDate && formik.errors.returnDate && (
                <p className="text-destructive text-xs">{formik.errors.returnDate}</p>
              )}
            </div>

            {/* Live price summary */}
            {days > 0 && (
              <div className="rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15 px-4 py-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${car.price_per_day} × {days} {days === 1 ? "day" : "days"}
                  </span>
                  <span className="font-semibold text-foreground">${totalPrice}</span>
                </div>
                {isSameDay && (
                  <p className="text-xs text-amber-600">
                    ⚡ Same-day returns are charged as 1 full day.
                  </p>
                )}
                <Separator className="my-1" />
                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="text-[#7C3AED]">${totalPrice}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                !!car.hasActiveBookings ||
                formik.isSubmitting ||
                (!accessToken ? false : (!formik.isValid || !formik.dirty))
              }
              className="w-full gradient-primary text-white rounded-xl h-11 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {formik.isSubmitting ? (
                <ClipLoader color="#fff" size={18} />
              ) : car.hasActiveBookings ? (
                <><FiAlertCircle className="w-4 h-4 mr-1" /> Car Unavailable</>
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
