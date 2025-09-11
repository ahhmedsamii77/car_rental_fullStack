import { FaStar } from "react-icons/fa6";
import Title from "./shared/Title";
import { motion } from "motion/react"
const testimonials = [
  { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
  { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
  { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
];
export default function Testimonial() {
  return (
    <div className="w-full py-5 mt-10">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25">
        <div className="text-center">
          <Title title="What Our Customers Say" description="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world." />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 , ease: "easeOut" }}
              whileHover={{ y: -20 }}
              viewport={{ once: true }}
              key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {Array(5).fill(0).map((_, index) => (
                  <FaStar key={index} className="w-4 h-4 text-primary" />
                ))}
              </div>
              <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
