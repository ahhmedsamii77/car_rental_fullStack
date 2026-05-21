import { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import toast from "react-hot-toast"
import { MdErrorOutline, MdOutlineMail } from "react-icons/md"
import { TbPassword } from "react-icons/tb"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  useSendResetPasswordOtp,
  useVerifyResetPasswordOtp,
  useResetPassword,
} from "../lib/queries"
import type { ForgotPasswordType, VerifyResetOtpType, ResetPasswordType } from "../types"
import { FiLock, FiMail, FiShield } from "react-icons/fi"

type Step = 1 | 2 | 3

export default function ForgotPassword({
  setShowForgotPassword,
  setShowLogin,
}: {
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
  setShowLogin: (v: boolean) => void
}) {
  const [step, setStep]   = useState<Step>(1)
  const [email, setEmail] = useState("")

  const { mutateAsync: sendOtp }   = useSendResetPasswordOtp()
  const { mutateAsync: verifyOtp } = useVerifyResetPasswordOtp()
  const { mutateAsync: resetPwd }  = useResetPassword()

  // ── Step 1: Enter email ──────────────────────────────────────
  const step1 = useFormik<ForgotPasswordType>({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await sendOtp(values)
        setEmail(values.email)
        toast.success("OTP sent to your email")
        setStep(2)
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err?.response?.data?.message ?? "Failed to send OTP")
      } finally {
        setSubmitting(false)
      }
    },
  })

  // ── Step 2: Verify OTP ───────────────────────────────────────
  const step2 = useFormik<Omit<VerifyResetOtpType, "email">>({
    initialValues: { otp: "" },
    validationSchema: yup.object({
      otp: yup.string().length(4, "OTP must be 4 digits").required("OTP is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await verifyOtp({ email, otp: values.otp })
        toast.success("OTP verified!")
        setStep(3)
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err?.response?.data?.message ?? "Invalid OTP")
      } finally {
        setSubmitting(false)
      }
    },
  })

  // ── Step 3: Reset Password ───────────────────────────────────
  const step3 = useFormik<Omit<ResetPasswordType, "email">>({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: yup.object({
      password:        yup.string().min(8, "Min 8 characters").required("Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await resetPwd({ email, password: values.password, confirmPassword: values.confirmPassword })
        toast.success("Password reset successfully! Please sign in.")
        setShowForgotPassword(false)
        setShowLogin(true)
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err?.response?.data?.message ?? "Failed to reset password")
      } finally {
        setSubmitting(false)
      }
    },
  })

  // ── Step indicator ───────────────────────────────────────────
  const steps = [
    { icon: FiMail,   label: "Email" },
    { icon: FiShield, label: "Verify" },
    { icon: FiLock,   label: "Reset" },
  ]

  return (
    <div className="space-y-5 w-full">
      {/* Step pills */}
      <div className="flex items-center justify-center gap-2 mb-1">
        {steps.map((s, i) => {
          const done    = step > i + 1
          const current = step === i + 1
          const Icon    = s.icon
          return (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  done    ? "bg-green-500 text-white" :
                  current ? "gradient-primary text-white" :
                            "bg-muted text-muted-foreground"
                }`}
              >
                {done ? "✓" : <Icon className="w-3.5 h-3.5" />}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 rounded ${done ? "bg-green-500" : "bg-muted"}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <form onSubmit={step1.handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Enter your email and we'll send you an OTP.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="fp-email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="fp-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={step1.values.email}
                onChange={step1.handleChange}
                onBlur={step1.handleBlur}
                className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
              />
            </div>
            {step1.touched.email && step1.errors.email && (
              <p className="flex items-center gap-1 text-destructive text-xs">
                <MdErrorOutline className="w-3.5 h-3.5" /> {step1.errors.email}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!step1.isValid || !step1.dirty}
            className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step1.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Send OTP"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => { setShowForgotPassword(false); setShowLogin(true) }}
              className="text-[#7C3AED] font-semibold hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </form>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <form onSubmit={step2.handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Enter the 4-digit code sent to <strong className="text-foreground">{email}</strong>
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="fp-otp" className="text-sm font-medium">OTP Code</Label>
            <div className="relative">
              <TbPassword className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="fp-otp"
                name="otp"
                type="text"
                maxLength={4}
                placeholder="1234"
                value={step2.values.otp}
                onChange={step2.handleChange}
                onBlur={step2.handleBlur}
                className="pl-9 rounded-xl tracking-widest text-center font-bold text-lg focus-visible:ring-[#7C3AED]"
              />
            </div>
            {step2.touched.otp && step2.errors.otp && (
              <p className="flex items-center gap-1 text-destructive text-xs">
                <MdErrorOutline className="w-3.5 h-3.5" /> {step2.errors.otp}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!step2.isValid || !step2.dirty}
            className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step2.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Verify OTP"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#7C3AED] font-semibold hover:underline cursor-pointer"
            >
              Resend OTP
            </button>
          </p>
        </form>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <form onSubmit={step3.handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Choose a strong new password.
          </p>
          {(["password", "confirmPassword"] as const).map((field) => (
            <div key={field} className="space-y-1.5">
              <Label htmlFor={`fp-${field}`} className="text-sm font-medium">
                {field === "password" ? "New Password" : "Confirm Password"}
              </Label>
              <div className="relative">
                <TbPassword className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id={`fp-${field}`}
                  name={field}
                  type="password"
                  placeholder="••••••••"
                  value={step3.values[field]}
                  onChange={step3.handleChange}
                  onBlur={step3.handleBlur}
                  className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
                />
              </div>
              {step3.touched[field] && step3.errors[field] && (
                <p className="flex items-center gap-1 text-destructive text-xs">
                  <MdErrorOutline className="w-3.5 h-3.5" /> {step3.errors[field]}
                </p>
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={!step3.isValid || !step3.dirty}
            className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step3.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Reset Password"}
          </Button>
        </form>
      )}
    </div>
  )
}
