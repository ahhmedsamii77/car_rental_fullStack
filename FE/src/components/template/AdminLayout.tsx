import { Outlet } from "react-router-dom"
import Sidebar from "../shared/Sidebar"
import AdminNav from "../shared/AdminNav"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HiBars3 } from "react-icons/hi2"
import { NavLink } from "react-router-dom"
import { MdDashboard, MdDirectionsCar, MdBookOnline, MdAddBox } from "react-icons/md"
import { FaCar } from "react-icons/fa6"

const sidebarLinks = [
  { name: "Overview",        path: "/dashboard",                icon: MdDashboard },
  { name: "Add Car",         path: "/dashboard/addCar",         icon: MdAddBox },
  { name: "Manage Cars",     path: "/dashboard/manageCars",     icon: MdDirectionsCar },
  { name: "Manage Bookings", path: "/dashboard/manageBookings", icon: MdBookOnline },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40">
        <AdminNav />
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Mobile sidebar via Sheet */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  className="w-12 h-12 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center cursor-pointer"
                  aria-label="Open menu"
                />
              }
            >
              <HiBars3 className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-60 bg-slate-900 text-white border-r border-white/10 p-0">
              {/* Brand */}
              <div className="flex items-center gap-2 px-5 py-5">
                <div className="gradient-primary w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <FaCar className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base font-[family-name:var(--font-display)] bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  DriveEase
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-5 pb-2">
                Admin Panel
              </p>
              <nav className="flex flex-col gap-1 px-3">
                {sidebarLinks.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={name}
                    to={path}
                    end={path === "/dashboard"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#7C3AED] text-white"
                          : "text-slate-400 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {name}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <main className="flex-1 py-8 px-5 md:px-10 min-h-[calc(100vh-56px)] overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
