'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  
  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToReserve = () => {
    const el = document.getElementById('reservations')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-dark-200">
      {/* Absolute ambient glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] mix-blend-multiply pointer-events-none"
        style={{ background: '#C9971C' }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pre-label */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px w-8 bg-gold-500 opacity-60" />
            <span className="section-label tracking-[0.3em] text-[10px]">Est. 2012 · Michelin Selected</span>
            <div className="h-px w-8 bg-gold-500 opacity-60 hidden lg:block" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-medium text-cream-50 leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            Where Every Meal
            <br />
            <span className="italic font-light flex items-center lg:justify-start justify-center gap-4 mt-2">
              <span className="text-gold-gradient">Becomes a Memory</span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-cream-100/60 text-base sm:text-lg font-light max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Immerse yourself in an unparalleled culinary journey. High-key aesthetics,
            curated wines, and an ambiance masterfully crafted for the extraordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <motion.button
              onClick={scrollToReserve}
              className="btn-primary text-sm px-10 py-4 shadow-gold hover:shadow-gold-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="hero-reserve-cta"
            >
              Reserve a Table
            </motion.button>
            <motion.button
              onClick={scrollToMenu}
              className="group flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-cream-50 hover:text-gold-500 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-gold-500 transition-colors">
                <ChevronDown size={14} className="-rotate-90 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              Explore Menu
            </motion.button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="mt-14 pt-8 border-t border-black/5 flex items-center justify-center lg:justify-start gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold-500 fill-gold-500" />)}
              </div>
              <p className="text-[10px] tracking-widest uppercase text-cream-100/40">5-Star Dining</p>
            </div>
            <div className="w-px h-8 bg-black/5" />
            <div>
              <p className="font-serif text-lg text-cream-50 leading-none mb-1">2024</p>
              <p className="text-[10px] tracking-widest uppercase text-cream-100/40">Award Winner</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative h-[500px] lg:h-[700px] w-full max-w-[550px] mx-auto rounded-t-full rounded-b-[4px] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="absolute inset-x-4 top-4 bottom-4 border border-white/40 rounded-t-full rounded-b-[2px] z-10 pointer-events-none" />
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1918"
            alt="Aurum luxury dining"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Soft inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
        </motion.div>

      </div>
    </section>
  )
}
