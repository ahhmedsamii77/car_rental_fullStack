import ManageBookingsData from "../components/ManageBookingsData";
import Loader from "../components/shared/Loader";
import { useGetDashboardData } from "../lib/queries";
import type { DashboardType } from "../types";

export default function ManageBookings() {
  const { data, isLoading } = useGetDashboardData();
  if (isLoading) {
    return <Loader />;
  }
  const dashboardData: DashboardType = data?.data.dashboardData;
  return (
    <div className="py-10 flex flex-col justify-between max-w-5xl">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Car</th>
                <th className="px-4 py-3 font-semibold truncate max-md:hidden">Date Range</th>
                <th className="px-4 py-3 font-semibold truncate">Total</th>
                <th className="px-4 py-3 font-semibold truncate  max-md:hidden">Payment</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {dashboardData.bookings.map(booking => <ManageBookingsData key={booking._id} booking={booking} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
