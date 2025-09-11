import Title from "../components/shared/Title";
import Upload from "../assets/upload_icon.svg"
import { MdDone } from "react-icons/md";
import { useFormik } from "formik";
import type { CarType } from "../types";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useAddCar } from "../lib/queries";
import toast from "react-hot-toast";
export default function AddCar() {
  const { mutateAsync: addCar } = useAddCar();
  const initialValues: CarType = {
    location: "",
    price_per_day: 0,
    description: "",
    transmission: "",
    fuel_type: "",
    price: 0,
    seating_capacity: 0,
    category: "",
    year: 0,
    model: "",
    brand: "",
    image: null,
  }
  async function onSubmit(values: CarType) {
    try {
      await addCar(values);
      addCarFormik.resetForm();
      toast.success("Car added successfully");
    } catch (error: any) {
      console.log(error?.response.data.message)
      toast.error("Something went wrong");
    }
  }
  const addCarFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      location: yup.string().required("Location is required"),
      price_per_day: yup.number().required("Price per day is required"),
      description: yup.string().required("Description is required"),
      transmission: yup.string().required("Transmission is required"),
      fuel_type: yup.string().required("Fuel type is required"),
      price: yup.number().required("Price is required"),
      seating_capacity: yup.number().required("Seating capacity is required"),
      category: yup.string().required("Category is required"),
      year: yup.number().required("Year is required"),
      model: yup.string().required("Model is required"),
      brand: yup.string().required("Brand is required"),
      image: yup.mixed<File>().required("Image is required"),
    })
  })
  return (
    <section className="mb-7 max-w-2xl">
      <Title title="Add New Car" description="Fill in details to list a new car for booking, including pricing, availability, and car specifications." />
      <form onSubmit={addCarFormik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <input onChange={(e) => {
            addCarFormik.setFieldValue("image", e.target.files?.[0])
          }} accept="image/*" className="hidden" type="file" id="image" />
          <label className="flex items-center gap-3" htmlFor="image">
            <img className="w-25 cursor-pointer" src={addCarFormik.values.image ? URL.createObjectURL(addCarFormik.values.image) : Upload} alt="upload" />
            <span className="text-sm text-gray-500 cursor-pointer">Upload a picture of your car</span>
            {addCarFormik.errors.image && addCarFormik.touched.image && <span className="text-red-500 text-sm">{addCarFormik.errors.image}</span>}
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="brand">Brand</label>
          <input value={addCarFormik.values.brand} onChange={addCarFormik.handleChange} onBlur={addCarFormik.handleBlur} placeholder="Honda, Toyota, Civic......" className="outline-primary border p-2 w-full border-gray-500/60 rounded-md text-sm" type="text" id="brand" />
          {addCarFormik.errors.brand && addCarFormik.touched.brand && <span className="text-red-500 text-sm">{addCarFormik.errors.brand}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="model">Model</label>
          <input value={addCarFormik.values.model} onChange={addCarFormik.handleChange} onBlur={addCarFormik.handleBlur} placeholder="X5, Accord, Civic......" className="outline-primary border p-2 w-full border-gray-500/60 rounded-md text-sm" type="text" id="model" />
          {addCarFormik.errors.model && addCarFormik.touched.model && <span className="text-red-500 text-sm">{addCarFormik.errors.model}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="year">Year</label>
          <input value={addCarFormik.values.year} onChange={addCarFormik.handleChange} onBlur={addCarFormik.handleBlur} placeholder="Honda, Toyota, Civic......" className="outline-primary border p-2 w-full border-gray-500/60 rounded-md text-sm" type="number" id="year" />
          {addCarFormik.errors.year && addCarFormik.touched.year && <span className="text-red-500 text-sm">{addCarFormik.errors.year}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="price">Daily Price ($)</label>
          <input value={addCarFormik.values.price} onChange={addCarFormik.handleChange} onBlur={addCarFormik.handleBlur} placeholder="Honda, Toyota, Civic......" className="outline-primary border p-2 w-full border-gray-500/60 rounded-md text-sm" type="number" id="price" />
          {addCarFormik.errors.price && addCarFormik.touched.price && <span className="text-red-500 text-sm">{addCarFormik.errors.price}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="category">Category</label>
          <select value={addCarFormik.values.category} onChange={addCarFormik.handleChange} className="outline-primary border p-2 w-full text-gray-500 border-gray-500/60 rounded-md text-sm" name="category">
            <option className="text-sm capitalize" disabled value="">select category</option>
            <option className="text-sm capitalize">sedan</option>
            <option className="text-sm capitalize">suv</option>
            <option className="text-sm capitalize">van</option>
          </select>
          {addCarFormik.errors.category && addCarFormik.touched.category && <span className="text-red-500 text-sm">{addCarFormik.errors.category}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="transmission">Transmission</label>
          <select value={addCarFormik.values.transmission} onChange={addCarFormik.handleChange} className="outline-primary border p-2 w-full text-gray-500 border-gray-500/60 rounded-md text-sm" name="transmission">
            <option className="text-sm capitalize" disabled value="">select transmission</option>
            <option className="text-sm capitalize">automatic</option>
            <option className="text-sm capitalize">manual</option>
            <option className="text-sm capitalize">semi-automatic</option>
            {addCarFormik.errors.transmission && addCarFormik.touched.transmission && <span className="text-red-500 text-sm">{addCarFormik.errors.transmission}</span>}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="fuel_type">Fuel Type</label>
          <select value={addCarFormik.values.fuel_type} onChange={addCarFormik.handleChange} className="outline-primary border p-2 w-full text-gray-500 border-gray-500/60 rounded-md text-sm" name="fuel_type">
            <option className="text-sm capitalize" disabled value="" >select fuel type</option>
            <option className="text-sm capitalize">gas</option>
            <option className="text-sm capitalize">diesel</option>
            <option className="text-sm capitalize">petrol</option>
            <option className="text-sm capitalize">electric</option>
            <option className="text-sm capitalize">hybird</option>
            {addCarFormik.errors.fuel_type && addCarFormik.touched.fuel_type && <span className="text-red-500 text-sm">{addCarFormik.errors.fuel_type}</span>}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="seating_capacity">Seating Capacity</label>
          <input value={addCarFormik.values.seating_capacity} onChange={addCarFormik.handleChange} placeholder="Honda, Toyota, Civic......" className="outline-primary border p-2 w-full border-gray-500/60 rounded-md text-sm" type="number" id="seating_capacity" />
          {addCarFormik.errors.seating_capacity && addCarFormik.touched.seating_capacity && <span className="text-red-500 text-sm">{addCarFormik.errors.seating_capacity}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="location">Location</label>
          <select value={addCarFormik.values.location} onChange={addCarFormik.handleChange} className="outline-primary border p-2 w-full text-gray-500 border-gray-500/60 rounded-md text-sm" name="location">
            <option className="text-sm capitalize" disabled value="">select loacation</option>
            <option className="text-sm capitalize">new york</option>
            <option className="text-sm capitalize">los angeles</option>
            <option className="text-sm capitalize">houston</option>
            <option className="text-sm capitalize">chicago</option>
          </select>
          {addCarFormik.errors.location && addCarFormik.touched.location && <span className="text-red-500 text-sm">{addCarFormik.errors.location}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500" htmlFor="description">Description</label>
          <textarea value={addCarFormik.values.description} onChange={addCarFormik.handleChange} rows={4} placeholder="e.g. This is a nice car" className="outline-primary h-32! resize-none border p-2 w-full border-gray-500/60 rounded-md text-sm" id="description" />
          {addCarFormik.errors.description && addCarFormik.touched.description && <span className="text-red-500 text-sm">{addCarFormik.errors.description}</span>}
        </div>
        <button type="submit" disabled={!addCarFormik.isValid || !addCarFormik.dirty} className={`mb-3 flex items-center gap-1 px-2  w-fit  transition-all active:scale-95 py-2 rounded text-white font-medium ${!addCarFormik.isValid || !addCarFormik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
          {addCarFormik.isSubmitting ? <ClipLoader color="#fff" size={20} /> : <>
            <MdDone className="w-4 h-4" />
            <span className="capitalize text-sm">list your car</span>
          </>}
        </button>
      </form>
    </section>
  )
}
