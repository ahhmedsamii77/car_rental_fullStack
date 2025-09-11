import BookingCard from "../components/BookingCard";
import Loader from "../components/shared/Loader";
import Title from "../components/shared/Title";
import { useGetUserBookings } from "../lib/queries";
import type { BookingResType } from "../types";
import { motion } from "motion/react"
export default function MyBookings() {
  const { data, isLoading } = useGetUserBookings();
  if (isLoading) {
    return <Loader />;
  }
  const bookings: BookingResType[] = data?.data.bookings;
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full py-10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25 py-7">
        {bookings?.length > 0 && <Title title="My Bookings" description="View and manage your bookings" />}
        {bookings?.length == 0 && <h1 className="text-4xl md:text-5xl font-bold">No Bookings Found</h1>}
        {bookings?.length > 0 && <div className="mt-7 space-y-5">
          {bookings.map((booking) => <BookingCard key={booking._id} booking={booking} index={bookings.indexOf(booking)} />)}
        </div>}
      </div>
    </motion.div>
  )
}
