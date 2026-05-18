import BookingInput from "./BookingInput"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { FiShield, FiStar, FiZap } from "react-icons/fi"

const stats = [
  { icon: FiStar,    label: "5-Star Rating",   value: "4.9/5" },
  { icon: FiShield,  label: "Insured Rides",    value: "100%" },
  { icon: FiZap,     label: "Instant Booking",  value: "24/7" },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero min-h-[88vh] flex items-center">
      {/* decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 2xl:px-20 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/30 hover:bg-[#7C3AED]/15 text-xs font-semibold tracking-wider uppercase px-3 py-1">
                ✦ Premium Car Rental
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-[family-name:var(--font-display)] mb-5"
            >
              Drive Your{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
                Dream Car
              </span>{" "}
              Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              Explore our premium fleet of luxury and everyday vehicles. Book in seconds, drive in style.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center justify-center lg:justify-start gap-6 mb-10"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#7C3AED]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-bold text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Booking form */}
            <div className="flex justify-center lg:justify-start">
              <BookingInput />
            </div>
          </div>

          {/* Right hero image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 hidden lg:flex items-center justify-center relative"
          >
            {/* Glow circle behind car */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80"
              alt="Luxury car"
              className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-2xl rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
