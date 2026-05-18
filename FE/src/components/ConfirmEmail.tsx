import { MdErrorOutline, MdOutlineMail } from "react-icons/md"
import { TbPassword } from "react-icons/tb"
import { useConfirmEmail } from "../lib/queries"
import type { ConfirmEmailType } from "../types"
import toast from "react-hot-toast"
import { useFormik } from "formik"
import * as yup from "yup"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiMail } from "react-icons/fi"

export default function ConfirmEmail({
  setShowConfirmEmail,
  setShowLogin,
}: {
  setShowConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { mutateAsync: confirmEmail } = useConfirmEmail()

  const initialValues: ConfirmEmailType = { otp: "", email: "" }

  async function onSubmit(values: ConfirmEmailType) {
    try {
      await confirmEmail(values)
      setShowConfirmEmail(false)
      setShowLogin(true)
      toast.success("Email confirmed! Please sign in.")
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err?.response?.data?.message ?? "Confirmation failed")
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      otp:   yup.string().length(4, "OTP must be 4 digits").required("OTP is required"),
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
      {/* Illustration */}
      <div className="flex justify-center mb-2">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
          <FiMail className="w-8 h-8 text-white" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center">Enter the 4-digit code sent to your email.</p>

      <div className="space-y-1.5">
        <Label htmlFor="conf-email" className="text-sm font-medium">Email</Label>
        <div className="relative">
          <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="conf-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="flex items-center gap-1 text-destructive text-xs">
            <MdErrorOutline className="w-3.5 h-3.5" /> {formik.errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="otp" className="text-sm font-medium">OTP Code</Label>
        <div className="relative">
          <TbPassword className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="otp"
            name="otp"
            type="text"
            maxLength={4}
            placeholder="1234"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="pl-9 rounded-xl tracking-widest text-center font-bold text-lg focus-visible:ring-[#7C3AED]"
          />
        </div>
        {formik.touched.otp && formik.errors.otp && (
          <p className="flex items-center gap-1 text-destructive text-xs">
            <MdErrorOutline className="w-3.5 h-3.5" /> {formik.errors.otp}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Verify Email"}
      </Button>
    </form>
  )
}
