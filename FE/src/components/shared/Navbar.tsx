import { useContext, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { HiBars3 } from "react-icons/hi2"
import { IoCloseOutline } from "react-icons/io5"
import { CiSearch } from "react-icons/ci"
import { FiLogOut, FiLogIn } from "react-icons/fi"
import { FaCar } from "react-icons/fa6"
import Modal from "../Modal"
import { authContext } from "../../context/authContext"
import { useGetUserInfo, useLogout } from "../../lib/queries"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { name: "Home",         path: "/",              public: true },
  { name: "Cars",         path: "/cars",          public: true },
  { name: "About",        path: "/about",         public: true },
  { name: "Testimonials", path: "/testimonials",  public: true },
  { name: "My Bookings",  path: "/myBookings",    public: false },
  { name: "Dashboard",    path: "/dashboard",     public: false, adminOnly: true },
]

export default function Navbar() {
  const [open, setOpen]           = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { accessToken, setAccessToken, query, setQuery } = useContext(authContext)!
  const { mutateAsync: logout } = useLogout()
  const { data: userInfo } = useGetUserInfo()
  const navigate = useNavigate()

  const isAdmin = userInfo?.data?.user?.role === "admin"

  async function handleLogout() {
    try {
      await logout()
      setAccessToken(null)
      localStorage.removeItem("access_token")
      localStorage.removeItem("refersh_token")
      localStorage.removeItem("role")
      toast.success("Logged out successfully")
    } catch {
      toast.error("Logout failed")
    }
  }

  // Filter links based on auth state
  const visibleLinks = navLinks.filter((link) => {
    if (link.adminOnly) return isAdmin
    if (!link.public) return !!accessToken
    return true
  })

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="glass sticky top-0 z-50 w-full border-b border-border/60 shadow-sm"
      >
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="gradient-primary p-2 rounded-xl">
              <FaCar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg font-[family-name:var(--font-display)] bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              DriveEase
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {visibleLinks.map((link) => (
              <NavLink key={link.name} className="nav-link text-xs lg:text-sm font-medium text-foreground/80 whitespace-nowrap" to={link.path} end={link.path === "/"}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop search + auth */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => { navigate("/cars"); setQuery(e.target.value) }}
                className="pl-9 h-9 w-48 lg:w-60 rounded-full bg-muted/60 border-border/60 text-sm focus-visible:ring-[#7C3AED]"
                placeholder="Search cars…"
              />
            </div>
            {!accessToken ? (
              <Button onClick={() => setShowModal(true)} size="sm" className="gradient-primary text-white rounded-full px-5 hover:opacity-90 transition-opacity cursor-pointer">
                <FiLogIn className="w-4 h-4 mr-1" /> Login
              </Button>
            ) : (
              <Button onClick={handleLogout} size="sm" variant="outline" className="rounded-full px-5 border-[#7C3AED]/40 text-[#7C3AED] hover:bg-[#7C3AED]/10 cursor-pointer">
                <FiLogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-muted transition cursor-pointer" aria-label="Menu">
            {open ? <IoCloseOutline className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border/60 bg-background"
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {visibleLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setOpen(false)}
                    className="nav-link text-sm font-medium w-fit"
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="relative mt-1">
                  <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => { navigate("/cars"); setQuery(e.target.value); setOpen(false) }}
                    className="pl-9 rounded-full bg-muted/60"
                    placeholder="Search cars…"
                  />
                </div>
                {!accessToken ? (
                  <Button onClick={() => { setShowModal(true); setOpen(false) }} className="gradient-primary text-white rounded-full w-fit px-6 cursor-pointer">
                    <FiLogIn className="w-4 h-4 mr-1" /> Login
                  </Button>
                ) : (
                  <Button onClick={handleLogout} variant="outline" className="rounded-full w-fit px-6 border-[#7C3AED]/40 text-[#7C3AED] cursor-pointer">
                    <FiLogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  )
}
