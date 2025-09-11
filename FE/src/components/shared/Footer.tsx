import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { FaInstagram } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { TfiTwitter } from "react-icons/tfi";
import { motion } from "motion/react"
const footerIcons = [
  {
    icon: SlSocialFacebook,
  },
  {
    icon: RiLinkedinBoxLine,
  },
  {
    icon: FaInstagram,
  },
  {
    icon: TfiTwitter,
  }
]
const resources = [
  {
    name: "Documentation"
  },
  {
    name: "Tutorials"
  },
  {
    name: "Blog"
  },
  {
    name: "community"
  }
]
const company = [
  {
    name: "About"
  },
  {
    name: "Careers"
  },
  {
    name: "Privacy"
  },
  {
    name: "Terms"
  }
]
export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full mt-10">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col  md:flex-row items-start container mx-auto px-4 lg:px-8 2xl:px-25 py-5  justify-between gap-10">
        <div className="max-w-96">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            src={Logo} alt="car rental" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-sm text-gray-500">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.          </motion.p>
          <div className="flex items-center gap-3 mt-5 text-[#64748B]">
            {footerIcons.map((item, index) => (
              <item.icon key={index} className="w-5 h-5" />
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              {resources.map((item, index) => (
                <motion.li initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} key={index}><p>{item.name}</p></motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              {company.map((item, index) => (
                <motion.li initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} key={index}><p key={index}>{item.name}</p></motion.li>
              ))}
            </ul>
          </div>
        </div>

      </motion.div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-500   border-t  border-gray-500/30">
        Copyright 2024 © <Link to="/">Car Rental</Link>. All Right Reserved.
      </p>
    </motion.footer>
  )
}
