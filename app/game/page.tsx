"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function GamePage() {
  const router = useRouter()
  const [balloons, setBalloons] = useState<
    Array<{
      id: number
      x: number
      y: number
      color: string
      message: string
      popped: boolean
    }>
  >([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [showMessage, setShowMessage] = useState<{ show: boolean; message: string; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Messages to show when balloons are popped
  const messages = [
    "You're amazing!",
    "Happy Birthday!",
    "Wishing you joy!",
    "You're the best!",
    "Have a great day!",
    "Keep smiling!",
    "You rock!",
    "Stay awesome!",
    "Celebrate big!",
    "Make a wish!",
  ]

  // Colors for balloons
  const colors = [
    "bg-pink-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
  ]

  // Initialize balloons
  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    const newBalloons = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * (containerWidth - 100),
      y: Math.random() * (containerHeight - 150) + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      message: messages[i % messages.length],
      popped: false,
    }))

    setBalloons(newBalloons)
  }, [])

  // Pop a balloon
  const popBalloon = (id: number, x: number, y: number) => {
    setBalloons((prev) => prev.map((balloon) => (balloon.id === id ? { ...balloon, popped: true } : balloon)))

    setPoppedCount((prev) => prev + 1)

    // Show message
    const balloon = balloons.find((b) => b.id === id)
    if (balloon) {
      setShowMessage({
        show: true,
        message: balloon.message,
        x,
        y,
      })

      // Hide message after 2 seconds
      setTimeout(() => {
        setShowMessage(null)
      }, 2000)
    }
  }

  // Navigate to next page when all balloons are popped
  useEffect(() => {
    if (poppedCount === 10) {
      const timer = setTimeout(() => {
        router.push("/playlist")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [poppedCount, router])

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-start p-4 relative overflow-hidden"
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-4 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pop the Balloons!
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Tap each balloon to reveal a special message
      </motion.p>

      {/* Balloons */}
      <div className="relative flex-1 w-full">
        {balloons.map((balloon) => (
          <AnimatePresence key={balloon.id}>
            {!balloon.popped && (
              <motion.div
                className={`absolute cursor-pointer ${balloon.color} w-20 h-28 rounded-full flex items-center justify-center`}
                style={{
                  left: balloon.x,
                  top: balloon.y,
                  borderBottomLeftRadius: "50%",
                  borderBottomRightRadius: "50%",
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  y: [0, -10, 0, -5, 0],
                }}
                exit={{
                  scale: 1.5,
                  opacity: 0,
                }}
                transition={{
                  y: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2 + Math.random() * 2,
                    repeatType: "reverse",
                  },
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  popBalloon(balloon.id, rect.left + rect.width / 2, rect.top)
                }}
              >
                {/* Balloon string */}
                <div className="absolute w-1 h-16 bg-gray-400 -bottom-16 left-1/2 -translate-x-1/2"></div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Message popup */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="absolute bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-lg font-medium text-pink-600 z-10"
              style={{
                left: showMessage.x,
                top: showMessage.y - 50,
                transform: "translate(-50%, -100%)",
              }}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -20 }}
              exit={{ opacity: 0, scale: 0.5, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showMessage.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg font-medium">{poppedCount} / 10 balloons popped</p>
        </motion.div>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {poppedCount === 10 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Great Job!</h2>
              <p className="text-lg mb-6">You found all the birthday messages!</p>
              <p className="text-lg mb-6">Moving to the next surprise...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

