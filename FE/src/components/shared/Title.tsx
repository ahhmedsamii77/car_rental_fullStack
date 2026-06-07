import { motion } from "motion/react"

export default function Title({ title, description }: { title: string; description?: string }) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-3 text-center"
    >
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl font-[family-name:var(--font-display)] tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
