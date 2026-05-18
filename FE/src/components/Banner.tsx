import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { FiArrowRight } from "react-icons/fi"

export default function Banner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full my-20"
    >
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4]" />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 md:p-14">
            {/* Text */}
            <div className="flex-1 text-white">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                For Car Owners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 font-[family-name:var(--font-display)] leading-tight">
                Own a Luxury Car?<br />Start Earning Today!
              </h2>
              <p className="text-white/80 mb-6 max-w-md text-base leading-relaxed">
                Monetize your vehicle effortlessly. We handle insurance, driver verification, and secure payments — stress-free passive income.
              </p>
              <Link to="/dashboard">
                <Button className="bg-white text-[#7C3AED] hover:bg-white/90 rounded-full px-7 py-2.5 font-semibold gap-2 cursor-pointer">
                  List Your Car <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Image */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 flex justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80"
                alt="Luxury car"
                className="w-full max-w-sm rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
