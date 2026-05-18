import { FiUser } from "react-icons/fi"
import { MdErrorOutline, MdOutlineMail } from "react-icons/md"
import { TbPassword } from "react-icons/tb"
import { useCreateUser } from "../lib/queries"
import { useFormik } from "formik"
import type { UserType } from "../types"
import * as yup from "yup"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signup({
  setShowLogin,
  setShowConfirmEmail,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShowConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { mutateAsync: signup } = useCreateUser()

  const initialValues: UserType = { name: "", email: "", password: "", confirmPassword: "" }

  async function onSubmit(values: UserType) {
    try {
      await signup(values)
      toast.success("Account created! Check your email.")
      setShowConfirmEmail(true)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err?.response?.data?.message ?? "Registration failed")
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      name:            yup.string().required("Name is required"),
      email:           yup.string().email("Invalid email").required("Email is required"),
      password:        yup.string().min(6, "Min 6 characters").required("Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Required"),
    }),
  })

  const fields = [
    { id: "name",            type: "text",     icon: FiUser,         placeholder: "Your full name" },
    { id: "email",           type: "email",    icon: MdOutlineMail,  placeholder: "you@example.com" },
    { id: "password",        type: "password", icon: TbPassword,     placeholder: "••••••••" },
    { id: "confirmPassword", type: "password", icon: TbPassword,     placeholder: "Confirm password" },
  ] as const

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
      {fields.map(({ id, type, icon: Icon, placeholder }) => (
        <div key={id} className="space-y-1.5">
          <Label htmlFor={id} className="text-sm font-medium capitalize">
            {id === "confirmPassword" ? "Confirm Password" : id}
          </Label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={formik.values[id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
            />
          </div>
          {formik.touched[id] && formik.errors[id] && (
            <p className="flex items-center gap-1 text-destructive text-xs">
              <MdErrorOutline className="w-3.5 h-3.5" /> {formik.errors[id]}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button type="button" onClick={() => setShowLogin(true)} className="text-[#7C3AED] font-semibold hover:underline cursor-pointer">
          Sign In
        </button>
      </p>
    </form>
  )
}
