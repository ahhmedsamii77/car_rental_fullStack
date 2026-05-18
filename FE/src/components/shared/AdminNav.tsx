import { useContext } from "react"
import { Link } from "react-router-dom"
import { authContext } from "../../context/authContext"
import { useLogout } from "../../lib/queries"
import toast from "react-hot-toast"
import { FaCar } from "react-icons/fa6"
import { FiLogOut, FiHome } from "react-icons/fi"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AdminNav() {
  const { setAccessToken } = useContext(authContext)!
  const { mutateAsync: logout } = useLogout()

  async function handleLogout() {
    try {
      await logout()
      setAccessToken(null)
      localStorage.clear()
      toast.success("Logged out successfully")
    } catch {
      toast.error("Logout failed")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white border-b border-white/10">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 gap-4">
        {/* Brand (mobile only) */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
            <FaCar className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            DriveEase Admin
          </span>
        </div>

        {/* Desktop title */}
        <p className="hidden md:block text-sm text-slate-400 font-medium">
          Admin Dashboard
        </p>

        <div className="flex items-center gap-3 ml-auto">
          <Separator orientation="vertical" className="h-6 bg-white/10 hidden md:block" />

          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarFallback className="bg-[#7C3AED] text-white text-xs font-bold">AD</AvatarFallback>
          </Avatar>

          <Link to="/">
            <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 gap-1.5 rounded-lg cursor-pointer">
              <FiHome className="w-4 h-4" /> Home
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={handleLogout}
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 gap-1.5 rounded-lg cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
