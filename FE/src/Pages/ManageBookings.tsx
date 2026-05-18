import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { BookingResType } from "../types"
import ManageBookingsData from "../components/ManageBookingsData"
import { motion } from "motion/react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
            <Table>
              <TableHeader className="bg-gradient-to-r from-[#7C3AED]/8 via-muted/60 to-[#06B6D4]/8 border-b border-border/60">
                <TableRow className="hover:bg-transparent border-0">
                  <TableHead className="font-semibold text-foreground py-4 pl-4">Vehicle</TableHead>
                  <TableHead className="font-semibold text-foreground py-4 hidden md:table-cell">Dates</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Price</TableHead>
                  <TableHead className="font-semibold text-foreground py-4 hidden md:table-cell">Payment</TableHead>
                  <TableHead className="font-semibold text-foreground py-4 pr-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                      No bookings yet.
                    </td>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <ManageBookingsData key={booking._id} booking={booking} />
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
