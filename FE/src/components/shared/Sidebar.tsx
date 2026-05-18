import { NavLink } from "react-router-dom"
import { MdDashboard, MdDirectionsCar, MdBookOnline, MdAddBox } from "react-icons/md"
import { motion } from "motion/react"
import { Separator } from "@/components/ui/separator"
import { FaCar } from "react-icons/fa6"

const sidebarLinks = [
  { name: "Overview",        path: "/dashboard",                icon: MdDashboard },
  { name: "Add Car",         path: "/dashboard/addCar",         icon: MdAddBox },
  { name: "Manage Cars",     path: "/dashboard/manageCars",     icon: MdDirectionsCar },
  { name: "Manage Bookings", path: "/dashboard/manageBookings", icon: MdBookOnline },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex flex-col w-60 min-h-screen bg-slate-900 text-white shrink-0"
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="gradient-primary w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
          <FaCar className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-base font-[family-name:var(--font-display)] bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          DriveEase
        </span>
      </div>

      <Separator className="bg-white/10 mx-4 w-auto" />

      {/* Label */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-5 pt-5 pb-2">
        Admin Panel
      </p>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {sidebarLinks.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#7C3AED] text-white shadow-md"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} DriveEase</p>
      </div>
    </motion.aside>
  )
}
