import { motion } from "motion/react"
import { FiShield, FiStar, FiZap, FiUsers, FiMapPin, FiAward } from "react-icons/fi"
import { FaCar, FaHandshake, FaLeaf } from "react-icons/fa6"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: FiUsers,   value: "50,000+",  label: "Happy Customers" },
  { icon: FaCar,     value: "1,200+",   label: "Premium Cars" },
  { icon: FiMapPin,  value: "30+",      label: "Cities" },
  { icon: FiAward,   value: "8 Years",  label: "Of Excellence" },
]

const values = [
  {
    icon: FiShield,
    title: "Safety First",
    description: "Every vehicle is thoroughly inspected and insured. Our drivers are verified and every ride is tracked for your peace of mind.",
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
  },
  {
    icon: FiStar,
    title: "Premium Quality",
    description: "We partner only with top-tier vehicle owners. From sports sedans to luxury SUVs, every car meets our strict quality standards.",
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
  },
  {
    icon: FiZap,
    title: "Instant Booking",
    description: "Book in seconds, receive confirmation instantly. No paperwork, no waiting — just pick up and drive.",
    color: "text-[#7C3AED]",
    bg: "bg-[#7C3AED]/10",
  },
  {
    icon: FaHandshake,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden fees. What you see is what you pay, calculated daily for maximum flexibility.",
    color: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
  },
  {
    icon: FaLeaf,
    title: "Eco Friendly",
    description: "A growing fleet of electric and hybrid options to help reduce your carbon footprint without compromising on style.",
    color: "text-[#84CC16]",
    bg: "bg-[#84CC16]/10",
  },
  {
    icon: FiUsers,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you with anything you need, anytime.",
    color: "text-[#EC4899]",
    bg: "bg-[#EC4899]/10",
  },
]

const team = [
  {
    name: "Ahmed Sami",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300",
    bio: "Visionary entrepreneur with 15 years in the automotive industry.",
  },
  {
    name: "Sara Hassan",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300",
    bio: "Operations expert ensuring every rental experience is flawless.",
  },
  {
    name: "Omar Khalil",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    bio: "Full-stack engineer powering the DriveEase platform.",
  },
]

export default function About() {
  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-hero py-24 min-h-[55vh] flex items-center">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 2xl:px-20 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase"
          >
            ✦ Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight font-[family-name:var(--font-display)] mb-6"
          >
            Driving the Future of{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
              Car Rental
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            DriveEase was born from a simple belief: renting a premium car should be as effortless
            as unlocking your phone. We connect car owners with renters through a seamless,
            trust-first platform.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 bg-gradient-to-b from-transparent to-[#F5F3FF]/40">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7C3AED]/10 mb-4">
                  <Icon className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-display)]">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Our Mission ──────────────────────────────────────────────────── */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5 font-[family-name:var(--font-display)]">
                Redefining the Way{" "}
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                  People Move
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                We believe mobility should be accessible, premium, and stress-free. Our platform
                empowers car owners to monetize their idle vehicles while giving renters access to
                an unmatched fleet — at fair, transparent prices.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                Founded in 2016, DriveEase has grown from a small startup to serving over 50,000
                customers across 30+ cities. Our technology-first approach ensures every booking,
                payment, and interaction is seamless and secure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&q=80"
                alt="Premium car fleet"
                className="relative z-10 w-full rounded-3xl shadow-2xl object-cover max-h-[400px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="w-full py-20 bg-gradient-to-b from-[#F5F3FF]/40 to-transparent">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
              Our Core Values
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every decision we make is guided by the principles that have made us the most trusted
              car rental platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description, color, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow duration-300 h-full">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${bg} self-start`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
              The People Behind DriveEase
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
              Meet Our Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map(({ name, role, image, bio }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow duration-300 text-center overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-52 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-foreground">{name}</h3>
                      <p className="text-[#7C3AED] text-sm font-semibold mb-2">{role}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4]" />
            <div className="relative z-10 text-center text-white py-16 px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-display)]">
                Ready to Hit the Road?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-base">
                Browse our premium fleet and book your perfect ride in seconds.
              </p>
              <Link to="/cars">
                <Button className="bg-white text-[#7C3AED] hover:bg-white/90 rounded-full px-8 py-3 font-semibold text-base cursor-pointer">
                  Explore Cars →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
