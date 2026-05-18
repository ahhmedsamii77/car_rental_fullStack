import { MdErrorOutline, MdOutlineMail } from "react-icons/md"
import { TbPassword } from "react-icons/tb"
import { useLogin } from "../lib/queries"
import type { DecodedType, LoginType } from "../types"
import toast from "react-hot-toast"
import { useFormik } from "formik"
import * as yup from "yup"
import { ClipLoader } from "react-spinners"
import { useContext } from "react"
import { authContext } from "../context/authContext"
import { jwtDecode } from "jwt-decode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signin({ setShowLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { mutateAsync: signin } = useLogin()
  const { setRefershToken, setAccessToken } = useContext(authContext)!

  const initialValues: LoginType = { email: "", password: "" }

  async function onSubmit(values: LoginType) {
    try {
      const res = await signin(values)
      setAccessToken(res?.data.access_token)
      setRefershToken(res?.data.refersh_token)
      localStorage.setItem("access_token", res?.data.access_token)
      localStorage.setItem("refersh_token", res?.data.refersh_token)
      const role = jwtDecode<DecodedType>(res?.data.access_token as string).role
      localStorage.setItem("role", role)
      toast.success(res.data.message)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err?.response?.data?.message ?? "Login failed")
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      email:    yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().min(6, "Min 6 characters").required("Password is required"),
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <div className="relative">
          <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="flex items-center gap-1 text-destructive text-xs mt-1">
            <MdErrorOutline className="w-3.5 h-3.5" /> {formik.errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <TbPassword className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="pl-9 rounded-xl focus-visible:ring-[#7C3AED]"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="flex items-center gap-1 text-destructive text-xs mt-1">
            <MdErrorOutline className="w-3.5 h-3.5" /> {formik.errors.password}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        className="w-full gradient-primary text-white rounded-xl h-10 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? <ClipLoader color="#fff" size={18} /> : "Sign In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={() => setShowLogin(false)} className="text-[#7C3AED] font-semibold hover:underline cursor-pointer">
          Sign Up
        </button>
      </p>
    </form>
  )
}
