"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "../components/confetti"

export default function FinalPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showReplay, setShowReplay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Show replay button after video ends
    const timer = setTimeout(() => {
      setShowReplay(true)
    }, 10000) // Adjust based on actual video length

    return () => clearTimeout(timer)
  }, [])

  const handleReplay = () => {
    window.location.href = "/"
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <Confetti />

      <motion.div
        className="max-w-4xl w-full text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">Happy Birthday Nidhi!</h1>
        <p className="text-xl md:text-2xl text-purple-700">May all your wishes come true!</p>
      </motion.div>

      {/* Video or Image Collage */}
      <motion.div
        className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Replace with actual video or use a slideshow component */}
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline>
          <source src="/placeholder-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <motion.div
        className="max-w-2xl w-full bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg md:text-xl text-center text-gray-800 leading-relaxed">
          Dear Nidhi, I hope you enjoyed this little digital journey I created for you. May your special day be as
          wonderful as you are. Here's to celebrating you today and always!
        </p>
      </motion.div>

      <AnimatePresence>
        {showReplay && (
          <motion.button
            className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleReplay}
          >
            Replay
          </motion.button>
        )}
      </AnimatePresence>

      {/* Animated hearts and fireworks */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 10,
            }}
          >
            {["❤️", "🎉", "🎊", "✨", "💖", "🎂", "🎁"][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>
    </main>
  )
}

