import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { CarResType } from "../types"
import ManageCarData from "../components/ManageCarData"
import { motion } from "motion/react"

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
        <div className="rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col">

          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/40 shrink-0">
            <div>
              <h3 className="text-[14px] font-bold text-foreground">Cars</h3>
              <p className="text-[12px] text-muted-foreground">{cars.length} total vehicles</p>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/60">
            {cars.length === 0 ? (
              <p className="text-center text-muted-foreground text-[13px] py-8">
                No cars listed yet. Go to <strong>Add Car</strong> to get started.
              </p>
            ) : (
              cars.map((car) => <ManageCarData key={car._id} car={car} />)
            )}
          </div>

        </div>
      </motion.div>
    </section>
  )
}
