import { useFormik } from "formik";
import type { BookingType, CarResType } from "../types";
import { ClipLoader } from "react-spinners";
import * as yup from "yup";
import { useCreateBooking } from "../lib/queries";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function BookingForm({ car }: { car: CarResType }) {
  const navigate = useNavigate();
  const { mutateAsync: createBooking } = useCreateBooking();
  const initialValues: BookingType = {
    pickupDate: "",
    returnDate: "",
    carId: car._id,
  }
  async function onSubmit(values: BookingType) {
    try {
      const res = await createBooking(values);
      toast.success(res?.data.message);
      navigate("/myBookings");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
    bookingFomrik.resetForm();
  }
  const bookingFomrik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      pickupDate: yup.string().required("Pickup Date is required"),
      returnDate: yup.string().required("Return Date is required"),
    })
  });
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
        <span className="text-xl font-semibold">${car.price}</span>
        <span className="text-gray-400 font-medium">Per day</span>
      </div>
      <form onSubmit={bookingFomrik.handleSubmit} className="mt-5 space-y-5">
        <div>
          <label className="text-gray-400 font-medium" htmlFor="pickupDate">Pickup Date</label>
          <input value={bookingFomrik?.values.pickupDate} onChange={bookingFomrik.handleChange} onBlur={bookingFomrik.handleBlur} className="w-full outline-primary px-2 py-2 rounded-md border mt-1 border-gray-300/80 text-gray-500" type="date" id="pickupDate" />
          {bookingFomrik.errors.pickupDate && bookingFomrik.touched.pickupDate && <span className="text-red-500 text-sm">{bookingFomrik.errors.pickupDate}</span>}
        </div>
        <div>
          <label className="text-gray-400 font-medium" htmlFor="returnDate">Return Date</label>
          <input value={bookingFomrik?.values.returnDate} onChange={bookingFomrik.handleChange} onBlur={bookingFomrik.handleBlur} className="w-full outline-primary px-2 py-2 rounded-md border mt-1 border-gray-300/80 text-gray-500" type="date" id="returnDate" />
          {bookingFomrik.errors.returnDate && bookingFomrik.touched.returnDate && <span className="text-red-500 text-sm">{bookingFomrik.errors.returnDate}</span>}
        </div>
        <button disabled={!bookingFomrik.isValid || !bookingFomrik.dirty} type="submit" className={`text-white  hover:bg-primary-dull transition text-center rounded-lg w-full py-2.5 ${!bookingFomrik.isValid || !bookingFomrik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
          {bookingFomrik.isSubmitting ? <ClipLoader color="#fff" size={20} /> : "Book Now"}
        </button>
      </form>
      <p className="text-gray-500 text-center text-sm mt-5 font-medium">No credit card required to reserve</p>
    </div>
  )
}
