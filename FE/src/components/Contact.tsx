import Title from "./shared/Title";
import { motion } from "motion/react"
export default function Contact() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="my-20 text-center">
      <div className="container mx-auto px-4 lg:px-8 2xl:px-25 py-7">
        <Title title="Never Miss a Deal!" description="Subscribe to get the latest offers, new arrivals, and exclusive discounts" />
        <div className="flex items-center mx-auto mt-10 text-sm bg-white h-12 border rounded border-gray-500/30 w-full max-w-lg">
          <input className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="email" placeholder="info@gmail.com" />
          <button type="submit" className="bg-primary h-full px-5 flex items-center justify-center text-lg text-white cursor-pointer hover:bg-primary-dull transition">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
  )
}
