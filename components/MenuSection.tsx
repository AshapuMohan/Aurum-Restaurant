'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useMenuStore } from '@/store/useMenuStore'
import { useCartStore } from '@/store/useCartStore'

const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks']

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  
  const { items: menuItems } = useMenuStore()
  const { addToCart } = useCartStore()

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section id="menu" ref={ref} className="section-padding bg-dark-200 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #C9971C 1px, transparent 0)',
        backgroundSize: '48px 48px',
      }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Our Menu</span>
          <h2 className="section-title mb-4">Culinary Masterpieces</h2>
          <div className="gold-divider mb-6" />
          <p className="text-cream-100/55 text-base max-w-lg mx-auto leading-relaxed">
            Every dish is a canvas. Every ingredient, a story. Discover flavors 
            that elevate the ordinary into the extraordinary.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 border rounded-sm ${
                activeCategory === cat
                  ? 'bg-gold-500 text-dark-200 border-gold-500 font-semibold'
                  : 'border-black/10 text-cream-100/60 hover:border-gold-500/50 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {filtered.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <div className="menu-card glass group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-gold-500 text-dark-200 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <span className="text-[10px] text-gold-500/70 tracking-widest uppercase">{item.category}</span>
                    <h3 className="font-serif text-lg text-cream-50 mt-1 mb-2">{item.name}</h3>
                    <p className="text-cream-100/45 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
                    <span className="font-serif text-gold-400 text-lg font-medium">{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="text-xs text-cream-100/50 hover:text-gold-400 tracking-widest uppercase transition-colors"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('reservations')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
            id="menu-reserve-cta"
          >
            Reserve Your Table
          </button>
        </motion.div>
      </div>
    </section>
  )
}
