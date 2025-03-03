"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Confetti from "./components/confetti"
import MusicPlayer from "./components/music-player"

export default function LandingPage() {
  const router = useRouter()
  const [showMusicSelector, setShowMusicSelector] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)

  // Navigate to the next page
  const handleBegin = () => {
    router.push("/note")
  }

  // Show music selector when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMusicSelector(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <Confetti />

      {/* Greeting Text */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-pink-600 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hello Nidhi!
      </motion.h1>

      <motion.div
        className="text-2xl md:text-3xl text-purple-700 mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Welcome to your special birthday celebration!
      </motion.div>

      {/* Music Player */}
      {selectedMusic && <MusicPlayer src={selectedMusic} />}

      {/* Music Selector */}
      {showMusicSelector && !selectedMusic && (
        <motion.div
          className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 max-w-md w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-center mb-4">Choose Your Birthday Soundtrack</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { name: "Happy Birthday Jazz", src: "/music/happy-birthday-jazz.mp3" },
              { name: "Cheerful Celebration", src: "/music/cheerful-celebration.mp3" },
              { name: "Birthday Party", src: "/music/birthday-party.mp3" },
              { name: "Relaxing Birthday", src: "/music/relaxing-birthday.mp3" },
              { name: "No Music", src: "" },
            ].map((music, index) => (
              <button
                key={index}
                className="py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all"
                onClick={() => setSelectedMusic(music.src)}
              >
                {music.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Begin Button */}
      <motion.button
        className="mt-8 py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedMusic !== null ? 1 : 0 }}
        onClick={handleBegin}
        disabled={selectedMusic === null}
      >
        Tap to Begin
      </motion.button>

      {/* Floating Elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 text-3xl pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 5,
          }}
        >
          {["✨", "🎂", "🎁", "🎈", "🎊", "💖", "🌟"][Math.floor(Math.random() * 7)]}
        </motion.div>
      ))}
    </main>
  )
}

