'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Award, Leaf, Clock } from 'lucide-react'

const highlights = [
  { icon: Award, label: 'Michelin Recognition', value: '2 Stars' },
  { icon: Clock, label: 'Years of Excellence', value: '12+' },
  { icon: Leaf, label: 'Farm-to-Table Sourcing', value: '100%' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" ref={ref} className="section-padding overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative h-[480px] sm:h-[560px]">
              <Image
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=900&q=85"
                alt="Chef at Aurum restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold frame effect */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 -z-10" />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -right-0 lg:-right-8 glass-gold px-6 py-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p className="font-serif text-3xl text-gold-400 font-semibold">4.9</p>
              <p className="text-cream-100/50 text-xs tracking-widest uppercase mt-1">Guest Rating</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#C9971C">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-label block mb-4">Our Story</span>
            <h2 className="section-title mb-6">
              A Passion for<br />
              <span className="text-gold-gradient italic">Extraordinary</span> Cuisine
            </h2>
            <div className="w-12 h-px bg-gold-500 mb-8" />

            <div className="space-y-4 text-cream-100/60 text-[15px] leading-loose">
              <p>
                Founded in 2012 by Chef Vikram Arora, Aurum was born from a singular belief: 
                that a meal should be more than sustenance — it should be a narrative. 
                A story told through flavors, textures, and artistry.
              </p>
              <p>
                Our kitchen sources only the finest local and imported ingredients, 
                working directly with artisan producers and sustainable farms. 
                Each dish evolves through seasons, guided by what nature gives us 
                and what imagination allows us to create.
              </p>
              <p>
                From our signature Wagyu tenderloin to our theatrical chocolate sphere, 
                every plate leaving our kitchen carries the mark of obsessive craftsmanship 
                and a deep love for hospitality.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <h.icon size={20} className="text-gold-500 mx-auto mb-2" />
                  <p className="font-serif text-xl text-cream-50 font-semibold">{h.value}</p>
                  <p className="text-cream-100/40 text-[11px] tracking-wide mt-1">{h.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => {
                const el = document.getElementById('reservations')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary mt-10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              id="about-reserve-cta"
            >
              Experience Aurum
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
