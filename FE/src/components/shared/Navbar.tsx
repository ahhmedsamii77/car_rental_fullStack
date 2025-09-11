import { useContext, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import { HiBars3BottomLeft } from "react-icons/hi2"
import { CiSearch } from "react-icons/ci"
import { IoCloseOutline } from "react-icons/io5"
import Modal from "../Modal"
import { authContext } from "../../context/authContext"
import { useGetCars, useLogout } from "../../lib/queries"
import toast from "react-hot-toast"
import useDebounce from "../../utils/hooks/useDebounce"
import Loader from "./Loader"
import { motion } from "motion/react"
const navLinks = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Cars",
    path: "/cars"
  },
  {
    name: "My Bookings",
    path: "/myBookings"
  },
  {
    name: "Dashboard",
    path: "/dashboard"
  }
]
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { accessToken, setAccessToken } = useContext(authContext)!;
  const { mutateAsync: logout } = useLogout();
  const { query, setQuery } = useContext(authContext)!;
  const debounceValue = useDebounce({ value: query, delay: 500 });
  const { isLoading } = useGetCars({ limit: 500, query: debounceValue });
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      setAccessToken(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refersh_token");
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-300 bg-white sticky top-0 w-full shadow z-50">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25  py-5 relative flex items-center justify-between transition-all">
        <Link to="/">
          <motion.img whileHover={{ scale: 1.1 }} src={Logo} alt="car rental" />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5 md:gap-5 lg:gap-3 2xl:gap-8">
          {navLinks?.map((link, idx) => link.name == "Dashboard" && (localStorage.getItem("role") != "admin" || localStorage.getItem("role") == null) ? null : <NavLink key={idx} className="nav-link w-fit text-nowrap" to={link.path}>{link.name}</NavLink>)}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input value={query} onChange={e => {
              navigate("/cars")
              setQuery(e.target.value)
            }} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search Cars" />
            <CiSearch className="w-5 h-5" />
          </div>
          {!accessToken && <button onClick={() => setShowModal(true)} className="cursor-pointer px-10 py-2  bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm">
            Login
          </button>}
          {accessToken && <button onClick={handleLogout} className="cursor-pointer px-10 py-2  bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm">
            Logout
          </button>}
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" className={`md:hidden cursor-pointer ${open ? 'hidden' : 'block'}`}>
          <HiBars3BottomLeft className="w-8 h-8" />
        </button>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className={`md:hidden  cursor-pointer ${open ? 'block' : 'hidden'}`}>
          <IoCloseOutline className="w-8 h-8" />
        </button>
        {/* Mobile Menu */}
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          {navLinks.map((link, idx) => link.name == "Dashboard" && (localStorage.getItem("role") != "admin" || localStorage.getItem("role") == null) ? null : <NavLink key={idx} className="nav-link" to={link.path}>{link.name}</NavLink>)}
          {!accessToken && <button onClick={() => setShowModal(true)} className="cursor-pointer px-8 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm">
            Login
          </button>}
          {accessToken && <button onClick={handleLogout} className="cursor-pointer px-8 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm">
            Logout
          </button>}
        </div>
      </div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </motion.nav>
  )
}
