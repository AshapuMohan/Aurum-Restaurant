'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const GalleryComponent = dynamic(() => import('./Gallery'), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
})

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section id="gallery" ref={ref} className="section-padding overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Gallery</span>
          <h2 className="section-title mb-4">A Visual Journey</h2>
          <div className="gold-divider mb-6" />
          <p className="text-cream-100/55 text-base max-w-md mx-auto leading-relaxed">
            Every frame tells the story of passion, precision, and the relentless pursuit 
            of perfection in every detail.
          </p>
        </motion.div>

        <GalleryComponent inView={inView} />
      </div>
    </section>
  )
}
