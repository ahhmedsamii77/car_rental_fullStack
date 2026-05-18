import Title from "./shared/Title"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FiBell } from "react-icons/fi"
import toast from "react-hot-toast"

export default function Contact() {
  const [email, setEmail] = useState("")

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    toast.success("Subscribed successfully! 🎉")
    setEmail("")
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full py-20"
    >
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] text-white px-8 py-16 text-center">
          {/* decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#7C3AED]/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#06B6D4]/30 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <FiBell className="w-4 h-4 text-[#F59E0B]" />
              Stay in the loop
            </div>
            <Title
              title="Never Miss a Deal!"
              description="Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox."
            />
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-10 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#7C3AED] rounded-full flex-1"
              />
              <Button
                type="submit"
                className="gradient-primary text-white rounded-full px-7 font-semibold hover:opacity-90 transition cursor-pointer shrink-0"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
