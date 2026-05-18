import { useFormik } from "formik"
import { MdOutlineSearch } from "react-icons/md"
import type { AvailableCarType } from "../types"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaMapMarkerAlt className="text-[#7C3AED]" /> Location
          </Label>
          <Select
            value={formik.values.location}
            onValueChange={(val) => formik.setFieldValue("location", val)}
          >
            <SelectTrigger className="w-full rounded-xl border border-border bg-muted/40 px-3 py-5 text-sm focus:ring-[#7C3AED]/50">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="los angeles">Los Angeles</SelectItem>
              <SelectItem value="houston">Houston</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pickup */}
        <div className="flex-1 min-w-0">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaCalendarAlt className="text-[#F59E0B]" /> Pickup Date
          </Label>
          <Input
            type="date"
            id="pickupDate"
            value={formik.values.pickupDate}
            onChange={formik.handleChange}
            className="rounded-xl focus-visible:ring-[#7C3AED]"
          />
        </div>

        {/* Return */}
        <div className="flex-1 min-w-0">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FaCalendarAlt className="text-[#06B6D4]" /> Return Date
          </Label>
          <Input
            type="date"
            id="returnDate"
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            className="rounded-xl focus-visible:ring-[#7C3AED]"
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
