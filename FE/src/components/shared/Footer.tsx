import { Link } from "react-router-dom"
import { FaCar, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { SlSocialFacebook } from "react-icons/sl"
import { RiLinkedinBoxLine } from "react-icons/ri"
import { motion } from "motion/react"
import { Separator } from "@/components/ui/separator"

const socialIcons = [
  { icon: SlSocialFacebook, label: "Facebook" },
  { icon: RiLinkedinBoxLine, label: "LinkedIn" },
  { icon: FaInstagram,      label: "Instagram" },
  { icon: FaXTwitter,       label: "Twitter" },
]
const resources = ["Documentation", "Tutorials", "Blog", "Community"]
const company   = ["About", "Careers", "Privacy", "Terms"]
const services  = ["Car Rental", "Long-term Lease", "Airport Pickup", "Corporate"]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white mt-20"
    >
      <div className="container mx-auto px-4 lg:px-8 2xl:px-20 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="gradient-primary p-2 rounded-xl">
                <FaCar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl font-[family-name:var(--font-display)] bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                DriveEase
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-300 text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-300 text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-300 text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DriveEase. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
