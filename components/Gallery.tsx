'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Fine dining table setting', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', alt: 'Gourmet dish presentation', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Restaurant ambiance', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', alt: 'Chef special dish', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80', alt: 'Cocktail crafting', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', alt: 'Elegant plating', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80', alt: 'Wine selection', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80', alt: 'Dessert art', span: 'wide' },
]

interface GalleryProps {
  inView?: boolean
}

export default function Gallery({ inView = true }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prev = () => setCurrentIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setCurrentIndex(i => (i + 1) % galleryImages.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen])

  return (
    <>
      {/* Masonry Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => openLightbox(i)}
          >
            <div className={`relative overflow-hidden ${img.span === 'tall' ? 'h-80 sm:h-96' : img.span === 'wide' ? 'h-56' : 'h-56 sm:h-64'}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-gold-500 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9971C" strokeWidth="2">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Nav */}
            <button
              className="absolute left-4 sm:left-8 text-white/60 hover:text-gold-400 transition-colors z-10 p-2"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              className="absolute right-4 sm:right-8 text-white/60 hover:text-gold-400 transition-colors z-10 p-2"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              className="relative w-full max-w-4xl mx-8 aspect-[4/3]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm">
              {galleryImages[currentIndex].alt} — {currentIndex + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
