"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NotePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNext = () => {
    router.push("/gallery")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative">
      <motion.div
        className="max-w-2xl w-full bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-8">Happy Birthday, Nidhi!</h1>

        <div className="space-y-6">
          <p className="typing-effect text-lg md:text-xl text-gray-800 leading-relaxed">Dear Nidhi,</p>

          <motion.p
            className="text-lg md:text-xl text-gray-800 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            On this special day, I wanted to create something unique just for you. As you celebrate another year of your
            amazing journey, I hope this little digital gift brings a smile to your face.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-800 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Your friendship means the world to me. Your kindness, your laughter, and your spirit make every moment
            brighter. May this new year of your life be filled with joy, success, and countless beautiful memories.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-800 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Wishing you all the happiness in the world today and always!
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-right font-medium text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 4, duration: 1 }}
          >
            With love,
            <br />
            Your Friend
          </motion.p>
        </div>
      </motion.div>

      <motion.button
        className="mt-8 py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 5, duration: 1 }}
        onClick={handleNext}
      >
        Keep Going
      </motion.button>

      {/* Floating hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 5,
          }}
        >
          💖
        </motion.div>
      ))}
    </main>
  )
}

