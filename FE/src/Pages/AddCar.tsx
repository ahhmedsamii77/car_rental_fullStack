import { useState } from "react"
import Title from "../components/shared/Title"
import { MdDone, MdOutlineCloudUpload } from "react-icons/md"
import { useFormik } from "formik"
import type { CarType } from "../types"
import * as yup from "yup"
import { ClipLoader } from "react-spinners"
import { useAddCar } from "../lib/queries"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AddCar() {
  const { mutateAsync: addCar } = useAddCar()
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedProgress, setSeedProgress] = useState(0)

  async function handleSeedCars() {
    setIsSeeding(true)
    setSeedProgress(0)
    
    const carsData = [
      { brand: "Honda", model: "Civic", price_per_day: 45, price: 25000, category: "sedan", year: 2023, trans: "automatic", fuel: "gas", loc: "new york", seats: 5, desc: "Reliable and fuel-efficient daily driver with modern tech." },
      { brand: "Toyota", model: "RAV4", price_per_day: 55, price: 30000, category: "suv", year: 2022, trans: "automatic", fuel: "hybrid", loc: "los angeles", seats: 5, desc: "Spacious and comfortable SUV, perfect for family trips." },
      { brand: "Ford", model: "F-150", price_per_day: 80, price: 45000, category: "truck", year: 2024, trans: "automatic", fuel: "gas", loc: "houston", seats: 5, desc: "Tough, rugged, and ready for any job or adventure." },
      { brand: "Tesla", model: "Model 3", price_per_day: 90, price: 40000, category: "sedan", year: 2023, trans: "automatic", fuel: "electric", loc: "chicago", seats: 5, desc: "Experience the future with this sleek electric vehicle." },
      { brand: "Porsche", model: "911", price_per_day: 250, price: 120000, category: "coupe", year: 2024, trans: "semi-automatic", fuel: "petrol", loc: "los angeles", seats: 2, desc: "Unmatched performance and iconic design." },
      { brand: "Audi", model: "Q5", price_per_day: 75, price: 50000, category: "suv", year: 2021, trans: "automatic", fuel: "gas", loc: "new york", seats: 5, desc: "Luxury compact SUV offering a smooth and quiet ride." },
      { brand: "Chevrolet", model: "Corvette", price_per_day: 150, price: 70000, category: "coupe", year: 2023, trans: "manual", fuel: "gas", loc: "houston", seats: 2, desc: "American muscle at its finest, thrilling V8 power." },
      { brand: "Honda", model: "Odyssey", price_per_day: 65, price: 35000, category: "van", year: 2022, trans: "automatic", fuel: "gas", loc: "chicago", seats: 7, desc: "The ultimate road-trip machine with room for 7." },
      { brand: "Mercedes-Benz", model: "C-Class", price_per_day: 110, price: 45000, category: "sedan", year: 2024, trans: "automatic", fuel: "gas", loc: "new york", seats: 5, desc: "Elegance and supreme comfort combined." },
      { brand: "Jeep", model: "Wrangler", price_per_day: 70, price: 38000, category: "suv", year: 2021, trans: "manual", fuel: "gas", loc: "los angeles", seats: 4, desc: "Take the top off and hit the beach or the trails." },
      { brand: "BMW", model: "X5", price_per_day: 130, price: 65000, category: "suv", year: 2023, trans: "automatic", fuel: "diesel", loc: "chicago", seats: 5, desc: "Sporty handling meets luxurious utility." },
      { brand: "Toyota", model: "Prius", price_per_day: 40, price: 28000, category: "sedan", year: 2020, trans: "automatic", fuel: "hybrid", loc: "houston", seats: 5, desc: "Unbeatable fuel economy in a practical package." },
      { brand: "Lexus", model: "RX", price_per_day: 95, price: 55000, category: "suv", year: 2022, trans: "automatic", fuel: "hybrid", loc: "new york", seats: 5, desc: "Incredibly smooth, quiet, and reliable luxury." },
      { brand: "Ford", model: "Mustang", price_per_day: 85, price: 35000, category: "coupe", year: 2024, trans: "manual", fuel: "gas", loc: "los angeles", seats: 4, desc: "Classic styling with modern V8 rumble." },
      { brand: "Kia", model: "Carnival", price_per_day: 75, price: 38000, category: "van", year: 2024, trans: "automatic", fuel: "gas", loc: "houston", seats: 8, desc: "A multi-purpose vehicle that feels like a private jet." },
      { brand: "Hyundai", model: "Elantra", price_per_day: 35, price: 22000, category: "sedan", year: 2021, trans: "automatic", fuel: "gas", loc: "chicago", seats: 5, desc: "Sharp looks and great value for city driving." },
      { brand: "Nissan", model: "Frontier", price_per_day: 60, price: 32000, category: "truck", year: 2023, trans: "automatic", fuel: "gas", loc: "new york", seats: 5, desc: "Capable mid-size truck for moving or camping." },
      { brand: "Audi", model: "e-tron", price_per_day: 120, price: 75000, category: "suv", year: 2022, trans: "automatic", fuel: "electric", loc: "los angeles", seats: 5, desc: "Whisper quiet electric luxury with plenty of space." },
      { brand: "Mazda", model: "MX-5", price_per_day: 65, price: 28000, category: "coupe", year: 2023, trans: "manual", fuel: "petrol", loc: "houston", seats: 2, desc: "The perfect weekend carving car, incredibly fun." },
      { brand: "Subaru", model: "Outback", price_per_day: 55, price: 33000, category: "suv", year: 2022, trans: "automatic", fuel: "gas", loc: "chicago", seats: 5, desc: "All-wheel drive confidence for any weather condition." }
    ]

    try {
      for (let i = 0; i < carsData.length; i++) {
        const car = carsData[i]
        const res = await fetch(`https://loremflickr.com/1200/800/${car.category},car?lock=${i + 1}`)
        const blob = await res.blob()
        const file = new File([blob], `${car.brand}_${car.model}.jpg`, { type: blob.type })

        await addCar({
          location: car.loc,
          price_per_day: car.price_per_day,
          description: car.desc,
          transmission: car.trans,
          fuel_type: car.fuel,
          price: car.price,
          seating_capacity: car.seats,
          category: car.category,
          year: car.year,
          model: car.model,
          brand: car.brand,
          image: file as any
        })
        setSeedProgress(i + 1)
      }
      toast.success("Successfully seeded 20 cars! 🎉")
    } catch (err: any) {
      toast.error("Error seeding cars: " + (err?.response?.data?.message ?? "Unknown error"))
    } finally {
      setIsSeeding(false)
    }
  }

  const initialValues: CarType = {
    location: "", price_per_day: 0, description: "", transmission: "",
    fuel_type: "", price: 0, seating_capacity: 0, category: "",
    year: 0, model: "", brand: "", image: null,
  }

  async function onSubmit(values: CarType) {
    try {
      await addCar(values)
      addCarFormik.resetForm()
      toast.success("Car added successfully! 🚗")
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err?.response?.data?.message ?? "Something went wrong")
    }
  }

  const addCarFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      location:        yup.string().required("Required"),
      price_per_day:   yup.number().min(1, "Must be > 0").required("Required"),
      description:     yup.string().required("Required"),
      transmission:    yup.string().required("Required"),
      fuel_type:       yup.string().required("Required"),
      price:           yup.number().min(1, "Must be > 0").required("Required"),
      seating_capacity:yup.number().min(1, "Must be > 0").required("Required"),
      category:        yup.string().required("Required"),
      year:            yup.number().min(1990, "Invalid year").required("Required"),
      model:           yup.string().required("Required"),
      brand:           yup.string().required("Required"),
      image:           yup.mixed<File>().required("Image is required"),
    }),
  })

  const err = addCarFormik.errors
  const touched = addCarFormik.touched

  function FieldError({ name }: { name: keyof typeof err }) {
    return touched[name] && err[name]
      ? <p className="text-destructive text-xs mt-1">{String(err[name])}</p>
      : null
  }

  return (
    <section className="mb-10 max-w-2xl">
      <div className="flex items-center justify-between">
        <Title title="Add New Car" description="Fill in the details to list a new vehicle for rental." />
        <Button 
          onClick={handleSeedCars} 
          disabled={isSeeding}
          className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white rounded-xl shadow-lg"
        >
          {isSeeding ? `Seeding... ${seedProgress}/20` : "Auto-Seed 20 Cars"}
        </Button>
      </div>

      <form onSubmit={addCarFormik.handleSubmit} className="mt-8 space-y-6">

        {/* Image upload */}
        <Card className="border-dashed border-2 border-border hover:border-[#7C3AED]/50 transition-colors cursor-pointer">
          <CardContent className="p-0">
            <label htmlFor="image" className="flex flex-col items-center gap-3 py-8 cursor-pointer">
              {addCarFormik.values.image ? (
                <img
                  src={URL.createObjectURL(addCarFormik.values.image)}
                  className="h-40 object-cover rounded-xl"
                  alt="Preview"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center">
                    <MdOutlineCloudUpload className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">Click to upload car image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </>
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => addCarFormik.setFieldValue("image", e.target.files?.[0])}
            />
          </CardContent>
        </Card>
        {touched.image && err.image && <p className="text-destructive text-xs">{String(err.image)}</p>}

        <Separator />

        {/* Basic info */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { id: "brand", label: "Brand", placeholder: "e.g. Toyota" },
            { id: "model", label: "Model", placeholder: "e.g. Corolla" },
          ].map(({ id, label, placeholder }) => (
            <div key={id} className="space-y-1.5">
              <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
              <Input
                id={id}
                placeholder={placeholder}
                value={addCarFormik.values[id as keyof CarType] as string}
                onChange={addCarFormik.handleChange}
                onBlur={addCarFormik.handleBlur}
                className="rounded-xl focus-visible:ring-[#7C3AED]"
              />
              <FieldError name={id as keyof typeof err} />
            </div>
          ))}

          <div className="space-y-1.5">
            <Label htmlFor="year" className="text-sm font-medium">Year</Label>
            <Input
              id="year" type="number" placeholder="e.g. 2022"
              value={addCarFormik.values.year || ""}
              onChange={addCarFormik.handleChange}
              onBlur={addCarFormik.handleBlur}
              className="rounded-xl focus-visible:ring-[#7C3AED]"
            />
            <FieldError name="year" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="price" className="text-sm font-medium">Daily Price ($)</Label>
            <Input
              id="price" type="number" placeholder="e.g. 85"
              value={addCarFormik.values.price || ""}
              onChange={addCarFormik.handleChange}
              onBlur={addCarFormik.handleBlur}
              className="rounded-xl focus-visible:ring-[#7C3AED]"
            />
            <FieldError name="price" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seating_capacity" className="text-sm font-medium">Seating Capacity</Label>
            <Input
              id="seating_capacity" type="number" placeholder="e.g. 5"
              value={addCarFormik.values.seating_capacity || ""}
              onChange={addCarFormik.handleChange}
              onBlur={addCarFormik.handleBlur}
              className="rounded-xl focus-visible:ring-[#7C3AED]"
            />
            <FieldError name="seating_capacity" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="price_per_day" className="text-sm font-medium">Price Per Day ($)</Label>
            <Input
              id="price_per_day" type="number" placeholder="e.g. 85"
              value={addCarFormik.values.price_per_day || ""}
              onChange={addCarFormik.handleChange}
              onBlur={addCarFormik.handleBlur}
              className="rounded-xl focus-visible:ring-[#7C3AED]"
            />
            <FieldError name="price_per_day" />
          </div>
        </div>

        {/* Selects */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { id: "category",     label: "Category",     options: ["sedan","suv","van","coupe","truck"] },
            { id: "transmission", label: "Transmission",  options: ["automatic","manual","semi-automatic"] },
            { id: "fuel_type",    label: "Fuel Type",     options: ["gas","diesel","petrol","electric","hybrid"] },
            { id: "location",     label: "Location",      options: ["new york","los angeles","houston","chicago"] },
          ].map(({ id, label, options }) => (
            <div key={id} className="space-y-1.5">
              <Label className="text-sm font-medium">{label}</Label>
              <Select
                value={addCarFormik.values[id as keyof CarType] as string}
                onValueChange={(val) => addCarFormik.setFieldValue(id, val)}
              >
                <SelectTrigger className="rounded-xl focus:ring-[#7C3AED]">
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {options.map((opt) => (
                    <SelectItem key={opt} value={opt} className="capitalize">{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError name={id as keyof typeof err} />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the car, features, condition…"
            rows={4}
            value={addCarFormik.values.description}
            onChange={addCarFormik.handleChange}
            onBlur={addCarFormik.handleBlur}
            className="rounded-xl resize-none focus-visible:ring-[#7C3AED]"
          />
          <FieldError name="description" />
        </div>

        <Button
          type="submit"
          disabled={!addCarFormik.isValid || !addCarFormik.dirty || addCarFormik.isSubmitting}
          className="gradient-primary text-white rounded-xl px-6 py-2.5 h-auto font-semibold gap-2 hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addCarFormik.isSubmitting
            ? <ClipLoader color="#fff" size={18} />
            : <><MdDone className="w-4 h-4" /> List Your Car</>
          }
        </Button>
      </form>
    </section>
  )
}
