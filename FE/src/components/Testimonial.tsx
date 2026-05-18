import { FaStar } from "react-icons/fa6"
import Title from "./shared/Title"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review: "Exceptional service from start to finish. The car was immaculate and the booking process was seamless. Highly recommended!",
    tag: "Luxury SUV"
  },
  {
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 5,
    review: "The entire experience was smooth, and the results exceeded all expectations. The team truly cares about quality.",
    tag: "Sports Sedan"
  },
  {
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely delivered great results.",
    tag: "Electric Car"
  },
]

export default function Testimonial() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-transparent to-[#F5F3FF]/60">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
        <div className="text-center mb-12">
          <Title
            title="What Our Customers Say"
            description="Thousands of happy renters trust DriveEase for their premium driving experiences."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/60 shadow-sm hover:shadow-violet transition-shadow duration-300 h-full">
                <CardContent className="p-6 flex flex-col gap-4">
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

                  {/* Tag */}
                  <span className="inline-block w-fit bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full">
                    {t.tag}
                  </span>

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
  )
}
