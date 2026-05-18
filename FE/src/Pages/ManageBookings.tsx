import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { BookingResType } from "../types"
import ManageBookingsData from "../components/ManageBookingsData"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

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
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className=" border-b border-border">
                  <th className="text-left font-semibold text-foreground px-4 py-1.5">Vehicle</th>
                  <th className="text-left font-semibold text-foreground px-4 py-1.5 hidden md:table-cell">Dates</th>
                  <th className="text-left font-semibold text-foreground px-4 py-1.5">Price</th>
                  <th className="text-left font-semibold text-foreground px-4 py-3 hidden md:table-cell">Payment</th>
                  <th className="text-left font-semibold text-foreground px-4 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground">
                      No bookings yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <ManageBookingsData key={booking._id} booking={booking} />
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
