"use client"

import { useState, useEffect, useRef } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

interface MusicPlayerProps {
  src: string
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return

    // Create audio element
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    // Play audio
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.error("Failed to play audio:", err)
        setIsPlaying(false)
      }
    }

    playAudio()

    // Cleanup
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [src, volume])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  if (!src) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg z-50 flex items-center space-x-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Music size={20} className={isPlaying ? "text-pink-600" : "text-gray-600"} />
      </button>

      <button
        onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        {volume === 0 ? (
          <VolumeX size={20} className="text-gray-600" />
        ) : (
          <Volume2 size={20} className="text-gray-600" />
        )}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
        className="w-20 accent-pink-600"
        aria-label="Volume control"
      />
    </div>
  )
}

