import Title from "../components/shared/Title"
import { useGetDashboardData } from "../lib/queries"
import Loader from "../components/shared/Loader"
import type { CarResType } from "../types"
import ManageCarData from "../components/ManageCarData"
import { motion } from "motion/react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Vehicle</TableHead>
                  <TableHead className="font-semibold text-foreground hidden md:table-cell">Category</TableHead>
                  <TableHead className="font-semibold text-foreground">Price</TableHead>
                  <TableHead className="font-semibold text-foreground hidden md:table-cell">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.length === 0 ? (
                  <TableRow>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                      No cars listed yet. Go to <strong>Add Car</strong> to get started.
                    </td>
                  </TableRow>
                ) : (
                  cars.map((car) => <ManageCarData key={car._id} car={car} />)
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
