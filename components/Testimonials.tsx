'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Nair',
    role: 'Food Critic, Bon Vivant Magazine',
    avatar: 'PN',
    rating: 5,
    review: "Aurum redefines fine dining in India. The truffle arancini alone is worth the visit — perfectly crisp, immaculately seasoned. The ambiance? Pure theatre. An experience that lingers long after the last course.",
  },
  {
    id: 2,
    name: 'Arjun Khanna',
    role: 'Entrepreneur & Gastronome',
    avatar: 'AK',
    rating: 5,
    review: "I've dined across three continents, and Aurum holds its own against the best. The Wagyu tenderloin was transcendent — the service, impeccable. It's my go-to for every important occasion.",
  },
  {
    id: 3,
    name: 'Meera Sharma',
    role: 'Luxury Travel Blogger',
    avatar: 'MS',
    rating: 5,
    review: "Every detail at Aurum is considered — from the curated wine list to the personalized menu cards. The chocolate sphere dessert is quite literally magical. A 5-star experience through and through.",
  },
  {
    id: 4,
    name: 'Rajesh & Sunita Patel',
    role: 'Anniversary Celebration',
    avatar: 'RP',
    rating: 5,
    review: "Our 25th anniversary at Aurum was unforgettable. The staff remembered every detail of our reservation and made us feel like royalty. The chef even sent a special dessert with a handwritten note. Extraordinary.",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(i => (i + 1) % testimonials.length)

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: '#FAF8F3' }}>
      {/* Ambient background */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #C9971C, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #C9971C, transparent)' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Testimonials</span>
          <h2 className="section-title mb-4">Voices of Our Guests</h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="glass-gold p-8 sm:p-12 text-center relative">
                {/* Quote icon */}
                <Quote size={36} className="text-gold-500/25 mx-auto mb-6" />

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="font-serif text-lg sm:text-xl text-cream-50/90 leading-relaxed max-w-2xl mx-auto mb-8 italic">
                  &quot;{testimonials[current].review}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                    <span className="text-gold-400 font-serif text-sm font-medium">
                      {testimonials[current].avatar}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-cream-50 font-medium text-sm">{testimonials[current].name}</p>
                    <p className="text-cream-100/40 text-xs mt-0.5">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-cream-100/60 hover:border-gold-500 hover:text-gold-400 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-black/10'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-cream-100/60 hover:border-gold-500 hover:text-gold-400 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
