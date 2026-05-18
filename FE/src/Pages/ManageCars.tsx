import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { CarResType } from "../types"
import ManageCarData from "../components/ManageCarData"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

export default function ManageCars() {
  const { data, isLoading } = useGetDashboardData()
  if (isLoading) return <Loader />
  const cars: CarResType[] = data?.data.dashboardData.cars ?? []

  return (
    <section className="mb-10 max-w-5xl">
      <Title title="Manage Cars" description="View, monitor and remove your listed vehicles." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm border-collapse border-spacing-0">
              <thead>
                <tr className="border-b border-border">
                  <th className="bg-muted text-left font-semibold text-foreground px-4 py-3">Vehicle</th>
                  <th className="bg-muted text-left font-semibold text-foreground px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="bg-muted text-left font-semibold text-foreground px-4 py-3">Price / Day</th>
                  <th className="bg-muted text-left font-semibold text-foreground px-4 py-3 hidden md:table-cell">Status</th>
                  <th className="bg-muted text-right font-semibold text-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground">
                      No cars listed yet. Go to <strong>Add Car</strong> to get started.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => <ManageCarData key={car._id} car={car} />)
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
