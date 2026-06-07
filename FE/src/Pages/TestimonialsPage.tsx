import { motion } from "motion/react"
import { FaStar, FaQuoteLeft } from "react-icons/fa6"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review:
      "Exceptional service from start to finish. The car was immaculate and the booking process was seamless. I booked a luxury SUV for a weekend trip and it was the best decision I made. Highly recommended!",
    tag: "Luxury SUV",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 5,
    review:
      "The entire experience was smooth, and the results exceeded all expectations. The team truly cares about quality. DriveEase made my business trip stress-free — I'll never use another rental service.",
    tag: "Sports Sedan",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review:
      "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely delivered great results. The electric car I rented was futuristic and eco-friendly.",
    tag: "Electric Car",
    date: "January 2025",
  },
  {
    id: 4,
    name: "Carlos Mendes",
    address: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    rating: 5,
    review:
      "I was blown away by how easy the booking process was. Got a stunning convertible for my anniversary trip — my partner was thrilled. The price was fair and the car was spotless. 10/10!",
    tag: "Convertible",
    date: "April 2025",
  },
  {
    id: 5,
    name: "Aisha Malik",
    address: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    rating: 5,
    review:
      "DriveEase is in a league of its own. The vehicle selection is unparalleled and the customer support team responded within minutes when I had a question. Will definitely be a repeat customer.",
    tag: "Premium SUV",
    date: "May 2025",
  },
  {
    id: 6,
    name: "Kenji Tanaka",
    address: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    review:
      "The transparency in pricing is what sets DriveEase apart. No hidden fees, no surprises. Knowing the exact cost before I confirmed gave me total confidence. A truly trustworthy platform.",
    tag: "Hybrid Sedan",
    date: "June 2025",
  },
]

const highlights = [
  { value: "4.9/5",   label: "Average Rating" },
  { value: "50,000+", label: "Happy Renters" },
  { value: "98%",     label: "Would Recommend" },
  { value: "12,000+", label: "Reviews" },
]

export default function TestimonialsPage() {
  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-hero py-24 flex items-center">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 2xl:px-20 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase"
          >
            ✦ Customer Stories
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight font-[family-name:var(--font-display)] mb-6"
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
              Customers Say
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Thousands of renters trust DriveEase for their premium driving experiences.
            Here's what they have to say.
          </motion.p>
        </div>
      </section>

      {/* ── Rating highlights ─────────────────────────────────────────────── */}
      <section className="w-full py-14 bg-gradient-to-b from-transparent to-[#F5F3FF]/40">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  {Array(5).fill(0).map((_, idx) => (
                    <FaStar key={idx} className="w-4 h-4 text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-display)]">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Testimonials grid ────────────────────────────────────────────── */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow duration-300 h-full">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    {/* Quote icon */}
                    <FaQuoteLeft className="w-6 h-6 text-[#7C3AED]/30" />

                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array(t.rating).fill(0).map((_, idx) => (
                        <FaStar key={idx} className="w-4 h-4 text-[#F59E0B]" />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      "{t.review}"
                    </p>

                    {/* Tag + Date */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full">
                        {t.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">{t.date}</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                      <img
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7C3AED]/20"
                        src={t.image}
                        alt={t.name}
                      />
                      <div>
                        <p className="font-semibold text-sm text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.address}</p>
                      </div>
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
                Join 50,000+ Happy Renters
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-base">
                Experience the DriveEase difference for yourself. Book your dream car today.
              </p>
              <Link to="/cars">
                <Button className="bg-white text-[#7C3AED] hover:bg-white/90 rounded-full px-8 py-3 font-semibold text-base cursor-pointer">
                  Browse Cars →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
