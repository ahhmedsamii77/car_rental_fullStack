import {motion} from "motion/react"
export default function Title({ title, description }: { title: string, description?: string }) {
  return (
    <motion.div
     initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 ,delay: 0.2}}
    className="space-y-2">
      <h1 className="text-3xl font-semibold  md:text-4xl lg:text-5xl">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  )
}
