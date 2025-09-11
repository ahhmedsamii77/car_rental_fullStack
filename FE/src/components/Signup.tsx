import { FiUser } from "react-icons/fi";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useCreateUser } from "../lib/queries";
import { useFormik } from "formik"
import type { UserType } from "../types";
import * as yup from "yup";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"
export default function Signup({ setShowLogin , setShowConfirmEmail }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>>, setShowConfirmEmail: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { mutateAsync: signup } = useCreateUser();
  const initialValues: UserType = { name: "", email: "", password: "", confirmPassword: "" };
  async function onSubmit(values: UserType) {
    try {
      await signup(values);
      toast.success("User created successfully");
      setShowConfirmEmail(true);
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  const signupFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Email is invalid").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    })
  });
  return (
    <form onSubmit={signupFormik.handleSubmit} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800"><span className="text-primary">Sign</span> Up</h2>
      <div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <FiUser className="w-4 h-4 text-gray-500/70" />
          <input value={signupFormik.values.name} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} id="name" className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Username" />
        </div>
        {signupFormik.touched.name && signupFormik.errors.name && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
          <div className="flex items-center gap-2">
            <MdErrorOutline className="w-4 h-4" />
            <p className="text-sm">{signupFormik?.errors.name}</p>
          </div>
        </div>}
      </div>
      <div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdOutlineMail className="w-4 h-4 text-gray-500/70" />
          <input value={signupFormik.values.email} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} id="email" className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="email" />
        </div>
        {signupFormik.touched.email && signupFormik.errors.email && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
          <div className="flex items-center gap-2">
            <MdErrorOutline className="w-4 h-4" />
            <p className="text-sm">{signupFormik?.errors.email}</p>
          </div>
        </div>}
      </div>
      <div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <TbPassword className="w-4 h-4 text-gray-500/70" />
          <input value={signupFormik.values.password} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} id="password" className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="password" />
        </div>
        {signupFormik.touched.password && signupFormik.errors.password && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
          <div className="flex items-center gap-2">
            <MdErrorOutline className="w-4 h-4" />
            <p className="text-sm">{signupFormik?.errors.password}</p>
          </div>
        </div>}
      </div>
      <div className="mb-8">
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <TbPassword className="w-4 h-4 text-gray-500/70" />
          <input value={signupFormik.values.confirmPassword} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} id="confirmPassword" className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="confrirm password" />
        </div>
        {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
          <div className="flex items-center gap-2">
            <MdErrorOutline className="w-4 h-4" />
            <p className="text-sm">{signupFormik?.errors.confirmPassword}</p>
          </div>
        </div>}
      </div>
      <button type="submit" disabled={!signupFormik.isValid || !signupFormik.dirty} className={` w-full mb-3   transition-all active:scale-95 py-2 rounded text-white font-medium ${!signupFormik.isValid || !signupFormik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
        {signupFormik.isSubmitting ? <ClipLoader color="#fff" size={20} /> : "Create Account"}
      </button>
      <p className="text-center mt-4">Already have an account? <button onClick={() => setShowLogin(true)} className="text-primary cursor-pointer underline">Login</button></p>
    </form>
  )
}
