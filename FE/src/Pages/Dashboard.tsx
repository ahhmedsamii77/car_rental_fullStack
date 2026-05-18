import { FaCarSide, FaCar } from "react-icons/fa6"
import Title from "../components/shared/Title"
import { CiViewList } from "react-icons/ci"
import { IoWarningOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import { MdAttachMoney, MdTrendingUp } from "react-icons/md"
import { HiOutlineChartBar } from "react-icons/hi"
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
    glow: "shadow-[0_0_20px_rgba(124,58,237,0.08)]",
    getValue: (d: DashboardType) => d.cars.length,
    sub: "Fleet size",
  },
  {
    key: "bookings",
    label: "All Bookings",
    icon: CiViewList,
    color: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
    border: "border-[#06B6D4]/20",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.08)]",
    getValue: (d: DashboardType) => d.bookings.length,
    sub: "All time",
  },
  {
    key: "pending",
    label: "Pending",
    icon: IoWarningOutline,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.08)]",
    getValue: (d: DashboardType) => d.pendingBookings.length,
    sub: "Awaiting review",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: IoCheckmarkCircleOutline,
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
    border: "border-[#10B981]/20",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]",
    getValue: (d: DashboardType) => d.completedBookings.length,
    sub: "Successfully done",
  },
]

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardData()
  if (isLoading) return <Loader />
  const d: DashboardType | undefined = data?.data.dashboardData
  if (!d) return <Loader />

  const total = d.bookings.length
  const confirmedPct = total > 0 ? Math.round((d.completedBookings.length / total) * 100) : 0
  const pendingPct   = total > 0 ? Math.round((d.pendingBookings.length   / total) * 100) : 0

  return (
    <section className="mb-10 max-w-6xl space-y-7">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <Title
          title="Admin Dashboard"
          description="Monitor platform performance — cars, bookings, and revenue at a glance."
        />
        <div className="flex items-center gap-2 text-sm font-medium text-[#7C3AED] bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl px-4 py-2">
          <HiOutlineChartBar className="w-4 h-4" />
          {confirmedPct}% Conversion Rate
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, bg, border, glow, getValue, sub }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 260, damping: 22 }}
          >
            <Card className={`border ${border} ${glow} hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}>
              {/* subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-transparent pointer-events-none" />
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${bg} ${color} p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-2xl font-bold ${color}`}>{getValue(d)}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Revenue Banner ── */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
        <Card className="border-[#7C3AED]/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/6 via-transparent to-[#06B6D4]/6 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex flex-wrap items-center gap-8">

              {/* Monthly */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center shrink-0">
                  <MdAttachMoney className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-[#7C3AED] leading-none mt-1">
                    ${(d.monthlyEarnings ?? 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Confirmed bookings</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-12 hidden sm:block opacity-50" />

              {/* Total */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                  <MdTrendingUp className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Total Earnings</p>
                  <p className="text-2xl font-bold text-[#10B981] leading-none mt-1">
                    ${(d.totalEarnings ?? 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">All-time revenue</p>
                </div>
              </div>

              {/* Pill badges */}
              <div className="ml-auto flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded-full px-3 py-1.5 border border-[#7C3AED]/20">
                  <FaCar className="w-3 h-3" /> {d.cars.length} Cars
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full px-3 py-1.5 border border-amber-200">
                  <IoWarningOutline className="w-3 h-3" /> {d.pendingBookings.length} Pending
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full px-3 py-1.5 border border-emerald-200">
                  <IoCheckmarkCircleOutline className="w-3 h-3" /> {d.completedBookings.length} Confirmed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Bottom Grid: Bookings + Breakdown ── */}
      <div className="grid gap-5 lg:grid-cols-5 items-start">

        {/* Recent Bookings — 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.38 }}
          className="lg:col-span-3"
        >
          <Card className="border-border/60 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Recent Bookings</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Latest customer reservations</p>
                </div>
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20 border border-[#7C3AED]/20 font-semibold">
                  {d.bookings.length} total
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-1 pb-2">
              <ul>
                {d.bookings.length === 0
                  ? <li className="py-12 text-center text-muted-foreground text-sm">No bookings yet</li>
                  : d.bookings.slice(0, 6).map(b => <RecentBooking key={b._id} booking={b} />)
                }
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right sidebar — 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.42 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Progress bars */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Booking Status</CardTitle>
              <p className="text-xs text-muted-foreground">Distribution across all bookings</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              {[
                { label: "Confirmed", pct: confirmedPct, count: d.completedBookings.length, barColor: "bg-[#10B981]", textColor: "text-[#10B981]" },
                { label: "Pending",   pct: pendingPct,   count: d.pendingBookings.length,   barColor: "bg-[#F59E0B]", textColor: "text-[#F59E0B]" },
              ].map(({ label, pct, count, barColor, textColor }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${textColor}`}>{count}</span>
                      <span className="text-xs text-muted-foreground">({pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.65, duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fleet snapshot */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Fleet Snapshot</CardTitle>
              <p className="text-xs text-muted-foreground">Quick platform numbers</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-0">
              {[
                { label: "Total Cars",   val: d.cars.length,               icon: FaCarSide,               color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
                { label: "All Bookings", val: d.bookings.length,            icon: CiViewList,              color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
                { label: "Pending",      val: d.pendingBookings.length,     icon: IoWarningOutline,        color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
                { label: "Confirmed",    val: d.completedBookings.length,   icon: IoCheckmarkCircleOutline,color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
              ].map(({ label, val, icon: Icon, color, bg }, idx, arr) => (
                <div key={label}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`${bg} ${color} p-1.5 rounded-lg`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                    <span className={`text-sm font-bold ${color}`}>{val}</span>
                  </div>
                  {idx < arr.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
