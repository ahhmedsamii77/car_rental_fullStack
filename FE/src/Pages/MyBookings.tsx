import BookingCard from "../components/BookingCard"
import Loader from "../components/shared/Loader"
import Title from "../components/shared/Title"
import { useGetUserBookings } from "../lib/queries"
import type { BookingResType } from "../types"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FiCalendar } from "react-icons/fi"

export default function MyBookings() {
  const { data, isLoading } = useGetUserBookings()
  if (isLoading) return <Loader />
  const bookings: BookingResType[] = data?.data.bookings ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-12 min-h-screen"
    >
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
        {bookings.length > 0 ? (
          <>
            <div className="mb-8">
              <Title title="My Bookings" description="View and manage all your vehicle reservations." />
            </div>
            <div className="space-y-5">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <BookingCard booking={booking} index={i} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center shadow-violet-lg">
              <FiCalendar className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">No Bookings Yet</h1>
              <p className="text-muted-foreground max-w-sm">
                You haven't made any bookings. Browse our premium fleet and reserve your first ride!
              </p>
            </div>
            <Link to="/cars">
              <Button className="gradient-primary text-white rounded-full px-8 py-2.5 font-semibold hover:opacity-90 transition cursor-pointer">
                Browse Cars →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
