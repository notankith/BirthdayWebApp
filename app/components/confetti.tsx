"use client"

import { useEffect, useRef } from "react"

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Confetti particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      rotation: number
      rotationSpeed: number
    }[] = []

    // Create confetti particles
    const createConfetti = () => {
      const colors = ["#ff69b4", "#ba55d3", "#9370db", "#4169e1", "#00bfff"]

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 1,
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        })
      }
    }

    createConfetti()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.y += p.speed
        p.x += Math.sin(p.angle) * 2
        p.rotation += p.rotationSpeed

        // Draw confetti
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

        ctx.restore()

        // Remove particles that are off-screen
        if (p.y > canvas.height) {
          particles.splice(i, 1)
          i--
        }
      }

      // Add new particles if needed
      if (particles.length < 50) {
        createConfetti()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" />
}

