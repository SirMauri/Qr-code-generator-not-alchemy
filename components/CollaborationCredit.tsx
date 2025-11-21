'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export function CollaborationCredit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center gap-1 text-xs"
      >
        {/* "Made with love" text */}
        <motion.span
          className="text-[hsl(var(--foreground))] opacity-70"
          whileHover={{ opacity: 1 }}
        >
          Made with love
        </motion.span>

        {/* Heart emoji with pulse animation */}
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="inline-block text-xs"
        >
          ❤️
        </motion.span>

        {/* "from" text */}
        <motion.span
          className="text-[hsl(var(--foreground))] opacity-70"
          whileHover={{ opacity: 1 }}
        >
          from
        </motion.span>

        {/* "Not Alchemy" with hover effect */}
        <motion.a
          href="https://www.not-alchemy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))]"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          Not Alchemy
        </motion.a>

        {/* ", with" text */}
        <motion.span
          className="text-[hsl(var(--foreground))] opacity-70"
          whileHover={{ opacity: 1 }}
        >
          , with
        </motion.span>

        {/* Claude Code logo with rotation on hover */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center"
        >
          <Image
            src="/claude-logo.png"
            alt="Claude Code"
            width={16}
            height={16}
            className="inline-block"
          />
        </motion.div>

        {/* "Claude Code" text */}
        <motion.span
          className="font-medium text-[hsl(var(--accent))]"
          whileHover={{ scale: 1.1, color: 'hsl(var(--primary))' }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          Claude Code
        </motion.span>
      </motion.div>

      {/* Floating animation for entire container */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
        className="absolute inset-0 -z-10"
      />
    </motion.div>
  )
}
