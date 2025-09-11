import { FaCarSide } from "react-icons/fa6";
import Title from "../components/shared/Title";
import { CiViewList } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { useGetDashboardData } from "../lib/queries";
import Loader from "../components/shared/Loader";
import type { DashboardType } from "../types";
import RecentBooking from "../components/RecentBookings";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardData();

  if (isLoading) {
    return <Loader />
  }
  const dashboardData: DashboardType = data?.data.dashboardData;
  return (
    <section className="mb-10 max-w-4xl">
      <Title title="Admin Dashboard" description="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" />
      <div className="grid mt-8 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="border border-gray-400/60 p-4 rounded-lg gap-5 flex items-center justify-between">
          <div>
            <h6 className="text-xs text-gray-500">Total Cars</h6>
            <span className="font-semibold text-lg">{dashboardData.cars.length}</span>
          </div>
          <div className="text-primary bg-primary/10 p-4 rounded-full">
            <FaCarSide className="w-8 h-8" />
          </div>
        </div>
        <div className="border border-gray-400/60 p-4 rounded-lg gap-5 flex items-center justify-between">
          <div>
            <h6 className="text-xs text-gray-500">Total Bookings</h6>
            <span className="font-semibold text-lg">{dashboardData.bookings.length}</span>
          </div>
          <div className="text-primary bg-primary/10 p-4 rounded-full">
            <CiViewList className="w-8 h-8" />
          </div>
        </div>
        <div className="border border-gray-400/60 p-4 rounded-lg gap-5 flex items-center justify-between">
          <div>
            <h6 className="text-xs text-gray-500">Pending</h6>
            <span className="font-semibold text-lg">{dashboardData.pendingBookings.length}</span>
          </div>
          <div className="text-primary bg-primary/10 p-4 rounded-full">
            <IoWarningOutline className="w-8 h-8" />
          </div>
        </div>
        <div className="border border-gray-400/60 p-4 rounded-lg gap-5 flex items-center justify-between">
          <div>
            <h6 className="text-xs text-gray-500">Confirmed</h6>
            <span className="font-semibold text-lg">{dashboardData.completedBookings.length}</span>
          </div>
          <div className="text-primary bg-primary/10 p-4 rounded-full">
            <CiViewList className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="grid mt-6 gap-5 lg:grid-cols-2 items-start">
        <div className="border border-gray-400/60 p-4 rounded-lg sm:w-[85%] md:w-[100%]">
          <h6 className="text-lg font-medium">Recent Bookings</h6>
          <p className="text-gray-500">Latest customer bookings</p>
          <ul className="mt-3 space-y-2">
            {dashboardData?.bookings.map(booking => <RecentBooking key={booking._id} booking={booking} />)}
          </ul>
        </div>
        <div className="border border-gray-400/60 p-4 rounded-lg md:w-[75%]">
          <h6 className="text-lg font-medium">Monthly Revenue</h6>
          <p className="text-gray-500 mb-5">Revenue for current month</p>
          <span className="text-3xl font-semibold text-primary ">${dashboardData.monthlyEarnings}</span>
        </div>
      </div>
    </section>
  )
}
