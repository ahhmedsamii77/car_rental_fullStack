import { FaCarSide, FaCar } from "react-icons/fa6"
import Title from "../components/shared/Title"
import { CiViewList } from "react-icons/ci"
import { IoWarningOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import { MdAttachMoney, MdTrendingUp } from "react-icons/md"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { DashboardType } from "../types"
import RecentBooking from "../components/RecentBookings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"

// ─── Stat Card Config ─────────────────────────────────────────────────────────
const statCards = [
  {
    key: "cars",
    label: "Total Cars",
    icon: FaCarSide,
    color: "text-[#7C3AED]",
    bg: "bg-[#7C3AED]/10",
    border: "border-[#7C3AED]/20",
    gradient: "from-[#7C3AED]/5 to-transparent",
    getValue: (d: DashboardType) => d.cars.length,
    trend: "+2 this week",
  },
  {
    key: "bookings",
    label: "Total Bookings",
    icon: CiViewList,
    color: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
    border: "border-[#06B6D4]/20",
    gradient: "from-[#06B6D4]/5 to-transparent",
    getValue: (d: DashboardType) => d.bookings.length,
    trend: "All time",
  },
  {
    key: "pendingBookings",
    label: "Pending",
    icon: IoWarningOutline,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20",
    gradient: "from-[#F59E0B]/5 to-transparent",
    getValue: (d: DashboardType) => d.pendingBookings.length,
    trend: "Needs action",
  },
  {
    key: "completedBookings",
    label: "Confirmed",
    icon: IoCheckmarkCircleOutline,
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
    border: "border-[#10B981]/20",
    gradient: "from-[#10B981]/5 to-transparent",
    getValue: (d: DashboardType) => d.completedBookings.length,
    trend: "Successfully done",
  },
]

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardData()
  if (isLoading) return <Loader />
  const dashboardData: DashboardType | undefined = data?.data.dashboardData
  if (!dashboardData) return <Loader />

  const conversionRate = dashboardData.bookings.length > 0
    ? Math.round((dashboardData.completedBookings.length / dashboardData.bookings.length) * 100)
    : 0

  return (
    <section className="mb-10 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <Title
          title="Admin Dashboard"
          description="Monitor platform performance including cars, bookings, and revenue."
        />
        <div className="flex items-center gap-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl px-4 py-2">
          <MdTrendingUp className="w-4 h-4 text-[#7C3AED]" />
          <span className="text-sm font-medium text-[#7C3AED]">{conversionRate}% Conversion Rate</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, bg, border, gradient, getValue, trend }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card className={`border ${border} hover:shadow-lg transition-all duration-300 overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${bg} ${color} p-2.5 rounded-xl`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">{trend}</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                <span className={`font-bold text-3xl ${color}`}>
                  {dashboardData ? getValue(dashboardData) : "—"}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="border-[#7C3AED]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/8 via-transparent to-[#06B6D4]/8 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Monthly Earnings */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center shrink-0">
                  <MdAttachMoney className="w-7 h-7 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-[#7C3AED]">
                    ${(dashboardData?.monthlyEarnings ?? 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">From confirmed bookings</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-14 hidden sm:block" />

              {/* Total Earnings */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                  <MdTrendingUp className="w-7 h-7 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Earnings</p>
                  <p className="text-3xl font-bold text-[#10B981]">
                    ${(dashboardData?.totalEarnings ?? 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">All-time revenue</p>
                </div>
              </div>

              {/* Quick Stats pills */}
              <div className="ml-auto flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-muted/60 rounded-full px-3 py-1.5 text-xs font-medium">
                  <FaCar className="w-3 h-3 text-[#7C3AED]" />
                  <span>{dashboardData?.cars?.length ?? 0} Cars</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 rounded-full px-3 py-1.5 text-xs font-medium">
                  <IoWarningOutline className="w-3 h-3" />
                  <span>{dashboardData.pendingBookings.length} Pending</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 rounded-full px-3 py-1.5 text-xs font-medium">
                  <IoCheckmarkCircleOutline className="w-3 h-3" />
                  <span>{dashboardData.completedBookings.length} Confirmed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Bookings + Breakdown */}
      <div className="grid gap-5 lg:grid-cols-5 items-start">

        {/* Recent Bookings — 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Latest customer reservations</p>
                </div>
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20 border-0 font-semibold">
                  {dashboardData.bookings.length} total
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-2 pb-0">
              <ul>
                {dashboardData.bookings.length === 0 ? (
                  <li className="py-10 text-center text-muted-foreground text-sm">No bookings yet.</li>
                ) : (
                  dashboardData.bookings.slice(0, 6).map((booking) => (
                    <RecentBooking key={booking._id} booking={booking} />
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Breakdown — 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Booking Breakdown */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Booking Breakdown</CardTitle>
              <p className="text-xs text-muted-foreground">Status distribution</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              {[
                { label: "Confirmed", value: dashboardData.completedBookings.length, total: dashboardData.bookings.length, color: "bg-[#10B981]", textColor: "text-[#10B981]" },
                { label: "Pending",   value: dashboardData.pendingBookings.length,   total: dashboardData.bookings.length, color: "bg-[#F59E0B]", textColor: "text-[#F59E0B]" },
              ].map(({ label, value, total, color, textColor }) => {
                const pct = total > 0 ? Math.round((value / total) * 100) : 0
                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground font-medium">{label}</span>
                      <span className={`font-bold ${textColor}`}>{value} <span className="text-muted-foreground font-normal text-xs">({pct}%)</span></span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-2 rounded-full ${color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )
              })}

              <Separator className="my-2" />

              {/* Fleet summary */}
              <div className="space-y-2 text-sm pt-1">
                {[
                  { label: "Total Cars",    val: dashboardData.cars.length,             color: "text-foreground" },
                  { label: "All Bookings",  val: dashboardData.bookings.length,          color: "text-[#06B6D4]" },
                  { label: "Pending",       val: dashboardData.pendingBookings.length,   color: "text-[#F59E0B]" },
                  { label: "Confirmed",     val: dashboardData.completedBookings.length, color: "text-[#10B981]" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`font-semibold ${color}`}>{val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
