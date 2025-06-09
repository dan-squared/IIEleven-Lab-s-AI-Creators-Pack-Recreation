"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

export const GlareCard = ({
  children,
  className,
  onSpin,
}: {
  children: React.ReactNode
  className?: string
  onSpin?: () => void
}) => {
  const isPointerInside = useRef(false)
  const refElement = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  })
  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--mask-opacity": "0",
    "--radius": "4.55% / 3.5%",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as any

  const backgroundStyle = {
    "--step": "4%",
    "--rainbow":
      "repeating-linear-gradient( 0deg,rgb(255,119,115) calc(var(--step) * 1),rgba(255,237,95,1) calc(var(--step) * 2),rgba(168,255,95,1) calc(var(--step) * 3),rgba(131,255,247,1) calc(var(--step) * 4),rgba(120,148,255,1) calc(var(--step) * 5),rgb(216,117,255) calc(var(--step) * 6),rgb(255,119,115) calc(var(--step) * 7) ) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal":
      "repeating-linear-gradient( 128deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,29%,66%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade":
      "radial-gradient( farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hard-light, overlay",
  }

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`)
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`)
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`)
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`)
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`)
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`)
    }
  }

  const handleClick = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setIsFlipped(!isFlipped)

    if (onSpin) {
      onSpin()
    }

    // Reset spinning state after animation
    setTimeout(() => {
      setIsSpinning(false)
    }, 1000)
  }

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-[366px] h-[509.734px] cursor-pointer"
      ref={refElement}
      onClick={handleClick}
      onPointerMove={(event) => {
        if (isSpinning) return

        const rotateFactor = 1.8 // Increased sensitivity
        const rect = event.currentTarget.getBoundingClientRect()
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        }
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        }

        const { background, rotate, glare } = state.current
        background.x = 50 + percentage.x / 2.5 - 20
        background.y = 50 + percentage.y / 2 - 25
        rotate.x = -(delta.x / 2.5)
        rotate.y = delta.y / 2
        rotate.x *= rotateFactor
        rotate.y *= rotateFactor
        glare.x = percentage.x
        glare.y = percentage.y

        updateStyles()
      }}
      onPointerEnter={() => {
        isPointerInside.current = true
        if (refElement.current) {
          refElement.current.style.setProperty("--opacity", "1")
          refElement.current.style.setProperty("--mask-opacity", "0.1")
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s")
            }
          }, 150) // Faster response
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration")
          refElement.current?.style.setProperty("--r-x", `0deg`)
          refElement.current?.style.setProperty("--r-y", `0deg`)
          refElement.current.style.setProperty("--opacity", "0")
          refElement.current.style.setProperty("--mask-opacity", "0")
        }
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-1000 ease-in-out ${
          isFlipped ? "[transform:rotateY(360deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          animation: isSpinning ? "spin360 1s ease-in-out" : "none",
        }}
      >
        <style jsx>{`
          @keyframes spin360 {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
        `}</style>

        {/* Front Face */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))_translateZ(20px)] rounded-[var(--radius)] border border-slate-800 hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden shadow-[0_0_10px_rgba(255,100,0,0.6),0_0_20px_rgba(255,100,0,0.4),0px_10px_20px_-5px_black]">
            <div className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))]">
              <div className={cn("h-full w-full", className)}>{children}</div>
            </div>

            {/* Masking Layer - Only visible on hover and tilt */}
            <div
              className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))] opacity-[var(--mask-opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)]"
              style={{
                backgroundImage: "url('/vmaxbg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "lighten",
                filter: "brightness(1.8) contrast(1.5) saturate(1.3)",
              }}
            />

            {/* Spotlight effect that follows cursor */}
            <div
              className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)]"
              style={{
                background: `radial-gradient(circle at var(--m-x) var(--m-y), rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Glare Effect */}
            <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,1.0)_3%,_rgba(255,255,255,0.8)_12%,_rgba(255,255,255,0.4)_25%,_rgba(255,255,255,0.1)_50%,_rgba(255,255,255,0)_70%)]" />

            {/* Rainbow Holographic Effect */}
            <div
              className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue,_hard-light,_overlay] [background:var(--rainbow),_var(--diagonal),_var(--shade)] relative after:content-[''] after:absolute after:inset-0 after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:[background-size:200%_400%,_800%,_200%] after:[background-position:0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:color-dodge,_hard-light] after:filter-[brightness(1.2)_contrast(1.5)_saturate(1.5)]"
              style={{ ...backgroundStyle }}
            />

            {/* Diagonal Light Streaks */}
            <div
              className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)]"
              style={{
                background: `
              linear-gradient(
                calc(var(--m-x) * 1.8deg + 45deg),
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0) 35%,
                rgba(255, 255, 255, 0.9) 50%,
                rgba(255, 255, 255, 0) 65%,
                rgba(255, 255, 255, 0) 100%
              ),
              linear-gradient(
                calc(var(--m-x) * 1.2deg + 135deg),
                rgba(255, 200, 100, 0) 0%,
                rgba(255, 200, 100, 0) 40%,
                rgba(255, 200, 100, 0.8) 50%,
                rgba(255, 200, 100, 0) 60%,
                rgba(255, 200, 100, 0) 100%
              )
            `,
                backgroundSize: "200% 200%, 150% 150%",
                backgroundPosition:
                  "calc(var(--bg-x) * 2%) calc(var(--bg-y) * 2%), calc(var(--bg-x) * 1.5%) calc(var(--bg-y) * 1.5%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>

        {/* Back Face - Clean with visible card back */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full rounded-[var(--radius)] border border-slate-800 overflow-hidden shadow-[0_0_10px_rgba(255,100,0,0.6),0_0_20px_rgba(255,100,0,0.4),0px_10px_20px_-5px_black]">
            <img
              src="/card-back.png"
              alt="Card back"
              className="w-full h-full object-cover"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
