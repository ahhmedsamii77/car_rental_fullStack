import { FaCarSide } from "react-icons/fa6"
import Title from "../components/shared/Title"
import { CiViewList } from "react-icons/ci"
import { IoWarningOutline } from "react-icons/io5"
import { MdAttachMoney } from "react-icons/md"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { DashboardType } from "../types"
import RecentBooking from "../components/RecentBookings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "motion/react"

const statCards = [
  { key: "cars",              label: "Total Cars",      icon: FaCarSide,       color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10", getValue: (d: DashboardType) => d.cars.length },
  { key: "bookings",          label: "Total Bookings",  icon: CiViewList,      color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", getValue: (d: DashboardType) => d.bookings.length },
  { key: "pendingBookings",   label: "Pending",         icon: IoWarningOutline,color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", getValue: (d: DashboardType) => d.pendingBookings.length },
  { key: "completedBookings", label: "Confirmed",       icon: CiViewList,      color: "text-[#10B981]", bg: "bg-[#10B981]/10", getValue: (d: DashboardType) => d.completedBookings.length },
]

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardData()
  if (isLoading) return <Loader />
  const dashboardData: DashboardType | undefined = data?.data.dashboardData
  if (!dashboardData) return <Loader />

  return (
    <section className="mb-10 max-w-5xl">
      <Title
        title="Admin Dashboard"
        description="Monitor platform performance including cars, bookings, and revenue."
      />

      {/* Stats */}
      <div className="grid mt-8 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, bg, getValue }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <span className="font-bold text-2xl">{dashboardData ? getValue(dashboardData) : "—"}</span>
                </div>
                <div className={`${bg} ${color} p-3 rounded-2xl`}>
                  <Icon className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue + Recent bookings */}
      <div className="grid mt-6 gap-5 lg:grid-cols-5 items-start">
        {/* Recent bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
              <p className="text-xs text-muted-foreground">Latest customer reservations</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-2 pb-0">
              <ul>
                {dashboardData?.bookings.slice(0, 6).map((booking) => (
                  <RecentBooking key={booking._id} booking={booking} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly revenue */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Revenue</CardTitle>
              <p className="text-xs text-muted-foreground">Confirmed bookings earnings</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <MdAttachMoney className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#7C3AED]">${dashboardData?.monthlyEarnings ?? 0}</p>
                  <p className="text-xs text-muted-foreground">From confirmed bookings</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cars</span>
                  <span className="font-semibold">{dashboardData?.cars?.length ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">All Bookings</span>
                  <span className="font-semibold">{dashboardData.bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-semibold text-[#F59E0B]">{dashboardData.pendingBookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confirmed</span>
                  <span className="font-semibold text-[#10B981]">{dashboardData.completedBookings.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
