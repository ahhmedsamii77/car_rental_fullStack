import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useLogin } from "../lib/queries";
import type { DecodedType, LoginType } from "../types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import { authContext } from "../context/authContext";
import { jwtDecode } from "jwt-decode";
export default function Signin({ setShowLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { mutateAsync: signin } = useLogin();
  const { setRefershToken, setAccessToken } = useContext(authContext)!;
  const initialValues: LoginType = {  email: "", password: "" };
  async function onSubmit(values: LoginType) {
    try {
      const res = await signin(values);
      setAccessToken(res?.data.access_token);
      setRefershToken(res?.data.refersh_token);
      localStorage.setItem("access_token", res?.data.access_token);
      localStorage.setItem("refersh_token", res?.data.refersh_token);
      const role = jwtDecode<DecodedType>(res?.data.access_token as string).role;
      localStorage.setItem("role", role);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }
  const signinFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      email: yup.string().email("Email is invalid").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    })
  });
  return (
    <>
      <form onSubmit={signinFormik.handleSubmit} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800"><span className="text-primary">Sign</span> in</h2>
        <div>
          <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
            <MdOutlineMail className="w-4 h-4 text-gray-500/70" />
            <input value={signinFormik.values.email} onChange={signinFormik.handleChange} onBlur={signinFormik.handleBlur} id="email" className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="email" />
          </div>
          {signinFormik.touched.email && signinFormik.errors.email && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
            <div className="flex items-center gap-2">
              <MdErrorOutline className="w-4 h-4" />
              <p className="text-sm">{signinFormik?.errors.email}</p>
            </div>
          </div>}
        </div>
        <div className="mb-8">
          <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
            <TbPassword className="w-4 h-4 text-gray-500/70" />
            <input value={signinFormik.values.password} onChange={signinFormik.handleChange} onBlur={signinFormik.handleBlur} id="password" className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="password" />
          </div>
          {signinFormik.touched.password && signinFormik.errors.password && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
            <div className="flex items-center gap-2">
              <MdErrorOutline className="w-4 h-4" />
              <p className="text-sm">{signinFormik?.errors.password}</p>
            </div>
          </div>}
        </div>
        <button type="submit" disabled={!signinFormik.isValid || !signinFormik.dirty} className={` w-full mb-3   transition-all active:scale-95 py-2 rounded text-white font-medium ${!signinFormik.isValid || !signinFormik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
          {signinFormik.isSubmitting ? <ClipLoader color="#fff" size={20} /> : "Login"}
        </button>
        <p className="text-center mt-4">Don&apos;t have an account? <button onClick={() => setShowLogin(false)} className="text-primary cursor-pointer underline">signup</button></p>
      </form>
    </>
  )
}
