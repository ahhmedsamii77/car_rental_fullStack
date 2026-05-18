import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Big 404 */}
        <div className="relative mb-6">
          <p className="text-[120px] font-black leading-none bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent select-none">
            404
          </p>
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-[#06B6D4]/10 blur-3xl -z-10 rounded-full" />
        </div>

        <h1 className="text-2xl font-bold mb-3 font-[family-name:var(--font-display)]">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like you took a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button className="gradient-primary text-white rounded-full px-8 py-2.5 font-semibold gap-2 hover:opacity-90 transition cursor-pointer">
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
