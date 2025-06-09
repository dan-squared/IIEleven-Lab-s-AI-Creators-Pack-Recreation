"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GlareCard } from "@/components/glare-card"

interface CardData {
  id: number
  title: string
  description: string
  offer: string
  category: string
  status: string
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "ElevenLabs",
    description: "ElevenLabs has the best Text to Speech models and Conversational AI platform. New users only.",
    offer: "3 MONTHS FREE ON CREATOR PLAN (WORTH $55)",
    category: "AUDIO",
    status: "No coupons remaining",
  },
  {
    id: 2,
    title: "HeyGen",
    description: "HeyGen has the most lifelike AI video and avatars to help creators scale content globally.",
    offer: "3 MONTHS FREE OF TEAM PLAN",
    category: "VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 3,
    title: "Luma AI",
    description: "Luma AI has the best cinematic & production-ready video generation models and creative platform",
    offer: "50% OFF DREAM MACHINE PLUS PLAN",
    category: "VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 4,
    title: "Hedra",
    description: "Hedra is the best multimodal AI content generation platform.",
    offer: "50% off first 2 months of Creator Plan",
    category: "AI ART",
    status: "No coupons remaining",
  },
  {
    id: 5,
    title: "Granola",
    description: "The AI notepad for teams in back-to-back meetings",
    offer: "3 months free on Granola Business for everyone in your",
    category: "AI TEXT",
    status: "No coupons remaining",
  },
  {
    id: 6,
    title: "Notion",
    description: "All-in-one workspace for notes, tasks, and knowledge base",
    offer: "6mo or 12mo free Notion Plus plan + AI add-on, depending on a creator's follower count",
    category: "AI MODEL",
    status: "No coupons remaining",
  },
  {
    id: 7,
    title: "Pika",
    description: "Reality is what you make it. Create unreal AI videos with Pika.",
    offer: "50% off first year of Pro plan, or first month free on the Fancy plan",
    category: "AI ART",
    status: "No coupons remaining",
  },
  {
    id: 8,
    title: "Higgsfield",
    description: "AI is a cinematic video creation platform with motion control at your fingertips.",
    offer: "25% off Ultimate plan for first 3 months",
    category: "AI VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 9,
    title: "Freepik",
    description: "Creative work, reimagined with AI. All in one place.",
    offer: "50% off in our top annual plan for the first 5000 users",
    category: "AI VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 10,
    title: "Magnific",
    description: "The image Upscaler, Transformer & Generator that feels like Magic",
    offer: "30% off all Annual Plans for first 5,000 users. Save $123 on Pro, $300 on Premium, $938 on Enterprise",
    category: "AI ART",
    status: "No coupons remaining",
  },
  {
    id: 11,
    title: "Flora",
    description: "An intuitive canvas to control every creative AI model with one subscription.",
    offer: "50% off first year of Pro, or First month free on Agency plan. Expires 30 June",
    category: "AI MODEL",
    status: "No coupons remaining",
  },
  {
    id: 12,
    title: "VEED",
    description: "AI-powered video creation for individuals and teams. Make better videos, faster.",
    offer: "50% off annual pro plan",
    category: "AI VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 13,
    title: "Lovable",
    description: "The last piece of software.",
    offer: "50% off Teams & Pro plans for first 3 months",
    category: "AI MODEL",
    status: "No coupons remaining",
  },
  {
    id: 14,
    title: "Viggle",
    description: "AI is a powerful AI animation tool and image-to-video generator.",
    offer: "1 month of Pro Plan for first 5000 users",
    category: "AI VIDEO",
    status: "No coupons remaining",
  },
  {
    id: 15,
    title: "Framer",
    description: "The website builder loved by designers.",
    offer: "25% off all annual framer personal plans",
    category: "AI MODEL",
    status: "No coupons remaining",
  },
]

// Define the order of logos for the hero section - all 15 company logos
const heroLogos = [
  { id: "elevenlabs", src: "/logos/elevenlabs.png" },
  { id: "heygen", src: "/logos/heygen.webp" },
  { id: "luma", src: "/logos/luma.webp" },
  { id: "hedra", src: "/logos/hedra.png" },
  { id: "granola", src: "/logos/granola.webp" },
  { id: "notion", src: "/logos/notion.webp" },
  { id: "pika", src: "/logos/pika.webp" },
  { id: "higgsfield", src: "/logos/higgsfield.webp" },
  { id: "freepik", src: "/logos/freepik.webp" },
  { id: "magnific", src: "/logos/magnific.webp" },
  { id: "flora", src: "/logos/flora.webp" },
  { id: "veed", src: "/logos/veed.webp" },
  { id: "lovable", src: "/logos/lovable.webp" },
  { id: "viggle", src: "/logos/viggle.webp" },
  { id: "framer", src: "/logos/framer.webp" },
]

function Card3D({ card }: { card: CardData }) {
  const [transform, setTransform] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Reduced sensitivity by changing multiplier from 1.5 to 1.0
    const rotateX = ((y - centerY) / 3) * 1.0
    const rotateY = ((centerX - x) / 3) * 1.0

    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`)
  }

  const handleMouseLeave = () => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)")
  }

  // Map card titles to their correct image filenames
  const getCardImagePath = (title: string) => {
    const imageMap: { [key: string]: string } = {
      ElevenLabs: "elevenlabs",
      HeyGen: "heygen",
      "Luma AI": "luma-ai",
      Hedra: "hedra",
      Granola: "granola",
      Notion: "notion",
      Pika: "pika",
      Higgsfield: "higgsfield",
      Freepik: "freepik",
      Magnific: "magnific",
      Flora: "flora",
      VEED: "veed",
      Lovable: "lovable",
      Viggle: "viggle",
      Framer: "framer",
    }
    return imageMap[title] || title.toLowerCase().replace(/\s+/g, "-")
  }

  // Map card titles to their logo paths
  const getLogoPath = (title: string) => {
    const logoMap: { [key: string]: string } = {
      Magnific: "/logos/magnific.webp",
      "Luma AI": "/logos/luma.webp",
      Notion: "/logos/notion.webp",
      Freepik: "/logos/freepik.webp",
      Framer: "/logos/framer.webp",
      Viggle: "/logos/viggle.webp",
      Flora: "/logos/flora.webp",
      Pika: "/logos/pika.webp",
      Higgsfield: "/logos/higgsfield.webp",
      HeyGen: "/logos/heygen.webp",
      Granola: "/logos/granola.webp",
      ElevenLabs: "/logos/elevenlabs.png",
      Lovable: "/logos/lovable.webp",
      VEED: "/logos/veed.webp",
      Hedra: "/logos/hedra.png",
    }
    return logoMap[title] || `/placeholder.svg?height=24&width=24&text=${encodeURIComponent(title.charAt(0))}`
  }

  return (
    <div className="space-y-4">
      {/* Main Card with GlareCard */}
      <div
        ref={cardRef}
        className="group cursor-pointer relative z-10"
        style={{
          transform: transform,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transformOrigin: "center",
          aspectRatio: "366/509",
          transition: "transform 0.3s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <GlareCard>
          <div className="relative w-full h-full overflow-hidden">
            {/* Base Card Image */}
            <img
              src={`/cards/${getCardImagePath(card.title)}.png`}
              alt={`${card.title} card front`}
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: "fill",
                objectPosition: "center",
              }}
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=509&width=366&text=${encodeURIComponent(card.title)}`
              }}
            />
          </div>
        </GlareCard>
      </div>

      {/* Details Section */}
      <Card className="bg-zinc-900 border-zinc-800 p-4 w-full max-w-[366px]">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center overflow-hidden p-0.5">
              <img
                src={getLogoPath(card.title) || "/placeholder.svg"}
                alt={`${card.title} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-lexend font-semibold text-sm sm:text-base">{card.title}</span>
          </div>
          <Button size="sm" className="ml-auto bg-white text-black hover:bg-zinc-200 text-xs font-lexend">
            {card.id <= 3 ? "Claim" : "Show code"}
          </Button>
        </div>
        <p className="text-red-400 text-xs font-lexend mt-1">{card.status}</p>
        <p className="text-white text-xs font-lexend mt-3 leading-relaxed">{card.description}</p>
        <p className="text-white text-xs font-lexend mt-3 font-semibold">{card.offer.toLowerCase()}</p>
      </Card>
    </div>
  )
}

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm border-b border-zinc-800/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <div className="text-white font-lexend font-bold text-sm sm:text-base">IIElevenLabs</div>
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white font-lexend">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Extended Frame with 150px more height */}
      <div className="container mx-auto px-4 py-8 pt-16">
        <div
          className="border border-zinc-700 rounded-3xl p-8 sm:p-12 md:p-16 mb-8 relative overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
            minHeight: "550px", // Extended frame height by 150px (400px + 150px)
          }}
        >
          <div className="text-center relative z-10">
            <div className="mb-8">
              <img src="/vol1.webp" alt="Vol.1" className="h-24 sm:h-32 md:h-40 mx-auto" />
            </div>
            <p className="text-white text-base sm:text-lg font-semibold mb-4 font-lexend">
              Save over $5,000 on the best AI apps for content
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>creators and artists
            </p>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed font-lexend">
              Take your audio, video, images, productivity and no-
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>code websites to the next level with these essential
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>tools.
            </p>
          </div>
        </div>

        {/* Logo Icons - All 15 company logos */}
        <div className="flex justify-center gap-1.5 mb-12 flex-wrap px-4">
          {heroLogos.map((logo) => (
            <div
              key={logo.id}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-md hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center p-1"
            >
              <img src={logo.src || "/placeholder.svg"} alt={logo.id} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12 px-4">
          {cardData.map((card) => (
            <div key={card.id} className="flex justify-center">
              <Card3D card={card} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs font-lexend">© 2024 AI Creator Pack - Terms - Privacy</p>
        </div>
      </div>
    </div>
  )
}
