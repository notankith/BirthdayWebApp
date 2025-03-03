"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Music, ExternalLink } from "lucide-react"

export default function PlaylistPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  // Sample playlist - replace with actual songs
  const playlist = [
    {
      title: "Happy Birthday",
      artist: "Stevie Wonder",
      link: "https://open.spotify.com/track/5t8KMSxDdc3JhI7QHnVwjV",
    },
    {
      title: "Birthday",
      artist: "Katy Perry",
      link: "https://open.spotify.com/track/5jAIouBES8LWMiriuNq170",
    },
    {
      title: "Count On Me",
      artist: "Bruno Mars",
      link: "https://open.spotify.com/track/7l8GfQTLHtHGruwXQcgpEr",
    },
    {
      title: "Good Time",
      artist: "Owl City & Carly Rae Jepsen",
      link: "https://open.spotify.com/track/1SZQeodGURNLMvvvwKoa5O",
    },
    {
      title: "Best Day Of My Life",
      artist: "American Authors",
      link: "https://open.spotify.com/track/2wqaekenojHgIUXEcfRj2G",
    },
    {
      title: "Walking On Sunshine",
      artist: "Katrina & The Waves",
      link: "https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0",
    },
    {
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      link: "https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleNext = () => {
    router.push("/final")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 relative">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-4 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8 }}
      >
        Your Birthday Playlist
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        A collection of songs just for you!
      </motion.p>

      <motion.div
        className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center">
          <Music size={24} className="mr-2" />
          <h2 className="text-xl font-semibold">Nidhi's Birthday Mix</h2>
        </div>

        <ul className="divide-y divide-gray-200">
          {playlist.map((song, index) => (
            <motion.li
              key={index}
              className="p-4 hover:bg-pink-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <a
                href={song.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <div>
                  <p className="font-medium text-gray-800">{song.title}</p>
                  <p className="text-gray-600">{song.artist}</p>
                </div>
                <ExternalLink size={18} className="text-gray-400 group-hover:text-pink-600 transition-colors" />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.button
        className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={handleNext}
      >
        Final Surprise
      </motion.button>

      {/* Floating music notes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.7, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 5,
          }}
        >
          {["🎵", "🎶", "🎼", "🎹", "🎷", "🎸", "🎺"][Math.floor(Math.random() * 7)]}
        </motion.div>
      ))}
    </main>
  )
}

