import { useFormik } from "formik"
import { MdOutlineSearch } from "react-icons/md"
import type { AvailableCarType } from "../types"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

export default function BookingInput() {
  const navigate = useNavigate()
  const initialValues: AvailableCarType = { returnDate: "", pickupDate: "", location: "" }

  function onSubmit(values: AvailableCarType) {
    navigate(`/cars?pickupDate=${values.pickupDate}&returnDate=${values.returnDate}&location=${values.location}`)
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      location:   yup.string().required(),
      pickupDate: yup.string().required(),
      returnDate: yup.string().required(),
    }),
  })

  return (
    <motion.form
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-2xl shadow-violet-lg p-4 mt-10 w-full max-w-3xl border border-border/60"
    >
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">

        {/* Location */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaMapMarkerAlt className="text-[#7C3AED]" /> Location
          </label>
          <select
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 cursor-pointer"
          >
            <option value="" disabled>Select city</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Pickup */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaCalendarAlt className="text-[#F59E0B]" /> Pickup Date
          </label>
          <input
            type="date"
            id="pickupDate"
            value={formik.values.pickupDate}
            onChange={formik.handleChange}
            className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
          />
        </div>

        {/* Return */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaCalendarAlt className="text-[#06B6D4]" /> Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
          />
        </div>

        {/* Search */}
        <Button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className="gradient-primary text-white rounded-xl px-6 py-2.5 h-auto gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <MdOutlineSearch className="w-5 h-5" />
          Search
        </Button>
      </div>
    </motion.form>
  )
}
