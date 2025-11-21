'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedOliveBranchProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export function AnimatedOliveBranch({ children, delay = 0, className, style }: AnimatedOliveBranchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
