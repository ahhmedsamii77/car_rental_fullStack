import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useConfirmEmail } from "../lib/queries";
import type { ConfirmEmailType } from "../types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
export default function ConfirmEmail({ setShowConfirmEmail, setShowLogin }: { setShowConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>, setShowLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { mutateAsync: confirmEmail } = useConfirmEmail();
  const initialValues: ConfirmEmailType = { otp: "", email: "" };
  async function onSubmit(values: ConfirmEmailType) {
    try {
      const res = await confirmEmail(values);
      setShowConfirmEmail(false);
      setShowLogin(true);
      console.log(res)
      toast.success("email confirmed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const signinFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      email: yup.string().email("Email is invalid").required("Email is required"),
      otp: yup.string().length(4, "OTP must be 4 digits").required("OTP is required"),
    })
  });
  return (
    <form onSubmit={signinFormik.handleSubmit} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800"><span className="text-primary">Confirm</span> Email</h2>
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
          <input value={signinFormik.values.otp} onChange={signinFormik.handleChange} onBlur={signinFormik.handleBlur} id="otp" className="w-full outline-none bg-transparent py-2.5" type="password" placeholder=".otp" />
        </div>
        {signinFormik.touched.otp && signinFormik.errors.otp && <div className="flex items-center justify-between text-red-600 max-w-80 w-full bg-red-600/10 p-1.5 rounded shadow">
          <div className="flex items-center gap-2">
            <MdErrorOutline className="w-4 h-4" />
            <p className="text-sm">{signinFormik?.errors.otp}</p>
          </div>
        </div>}
      </div>
      <button type="submit" disabled={!signinFormik.isValid || !signinFormik.dirty} className={` w-full mb-3   transition-all active:scale-95 py-2 rounded text-white font-medium ${!signinFormik.isValid || !signinFormik.dirty ? "bg-blue-400 cursor-not-allowed" : "cursor-pointer bg-primary hover:bg-primary-dull"}`}>
        {signinFormik.isSubmitting ? <ClipLoader color="#fff" size={20} /> : "send code"}
      </button>
    </form>
  )
}
