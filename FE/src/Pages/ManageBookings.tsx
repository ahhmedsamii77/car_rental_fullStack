import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { BookingResType } from "../types"
import ManageBookingsData from "../components/ManageBookingsData"
import { motion } from "motion/react"

export default function ManageBookings() {
  const { data, isLoading } = useGetDashboardData()
  if (isLoading) return <Loader />
  const bookings: BookingResType[] = data?.data.dashboardData.bookings ?? []

  return (
    <section className="mb-10 max-w-5xl">
      <Title title="Manage Bookings" description="Review, confirm, or cancel customer reservations." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <div className="rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col">

          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/40 shrink-0">
            <div>
              <h3 className="text-[14px] font-bold text-foreground">Bookings</h3>
              <p className="text-[12px] text-muted-foreground">{bookings.length} total bookings</p>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/60">
            {bookings.length === 0 ? (
              <p className="text-center text-muted-foreground text-[13px] py-8">
                No bookings yet.
              </p>
            ) : (
              bookings.map((booking) => (
                <ManageBookingsData key={booking._id} booking={booking} />
              ))
            )}
          </div>

        </div>
      </motion.div>
    </section>
  )
}
