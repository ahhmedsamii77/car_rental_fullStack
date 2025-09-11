import { useFormik } from "formik";
import { MdOutlineSearch } from "react-icons/md";
import type { AvailableCarType } from "../types";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { motion } from "motion/react"
export default function BookingInput() {
  const navigate = useNavigate();
  const initialValues: AvailableCarType = {
    returnDate: "",
    pickupDate: "",
    location: ""
  }
  function onSubmit(values: AvailableCarType) {
    console.log(values)
    navigate(`/cars?pickupDate=${values.pickupDate}&returnDate=${values.returnDate}&location=${values.location}`);
  }
  const availableCarsFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      location: yup.string().required("Location is required"),
      pickupDate: yup.string().required("Pickup Date is required"),
      returnDate: yup.string().required("Return Date is required"),
    })
  })
  return (
    <motion.form
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={availableCarsFormik.handleSubmit} className="bg-white rounded-lg p-6 mt-15 max-w-80 w-full flex flex-col gap-5 md:gap-8 shadow md:flex-row md:max-w-3xl md:rounded-full md:pl-15">
      <div className="flex flex-col gap-2 justify-center">
        <select value={availableCarsFormik.values.location} onChange={availableCarsFormik.handleChange} className="outline-primary w-fit" name="location" >
          <option value={""} disabled >Pickup Location</option>
          <option value={"New York"}>New York</option>
          <option value={"Los Angeles"}>Los Angeles</option>
          <option value={"Houston"}>Houston</option>
          <option value={"Chicago"}>Chicago</option>
        </select>
        <label className="text-sm text-gray-500" htmlFor="pickup-location">Please select location</label>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <label htmlFor="pickupDate">Pickup date</label>
        <input value={availableCarsFormik.values.pickupDate} onChange={availableCarsFormik.handleChange} id="pickupDate" className="outline-primary w-fit text-sm text-gray-500" type="date" />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <label htmlFor="returnDate">Return date</label>
        <input value={availableCarsFormik.values.returnDate} onChange={availableCarsFormik.handleChange} id="returnDate" className="outline-primary w-fit text-sm text-gray-500" type="date" />
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit" disabled={!availableCarsFormik.isValid || !availableCarsFormik.dirty} className={`text-white  md:ml-auto flex items-center  justify-center gap-1 w-fit hover:bg-primary-dull   px-6  rounded-full ${!availableCarsFormik.isValid || !availableCarsFormik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
        <MdOutlineSearch className="w-5 h-5" />
        <span>Search</span>
      </motion.button>
    </motion.form>
  )
}
