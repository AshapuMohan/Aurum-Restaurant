'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

const navLinks = [
  { href: '#menu', label: 'Menu' },
  { href: '#reservations', label: 'Reserve' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Cart state
  const { items, setIsOpen } = useCartStore()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Determine active section
      const sections = ['hero', 'menu', 'reservations', 'gallery', 'about', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'
          }`}
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,151,28,0.15)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={() => scrollTo('#hero')}>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
                <span className="text-gold-500 text-xs font-serif tracking-widest">A</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] text-cream-50 uppercase">Aurum</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'text-gold-500' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-5">
            {mounted && (
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-cream-50 hover:text-gold-500 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold-500 text-dark-200 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            )}
            <motion.button
              onClick={() => scrollTo('#reservations')}
              className="btn-primary text-xs py-2.5 px-5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve a Table
            </motion.button>
          </div>

          {/* Mobile toggle & Cart */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-cream-50 hover:text-gold-500 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold-500 text-dark-200 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            )}
            <button
              className="text-cream-50 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-8"
            style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <div className="flex flex-col gap-8 mt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-serif text-3xl text-cream-50 hover:text-gold-500 transition-colors"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => scrollTo('#reservations')}
                className="btn-primary w-full justify-center"
              >
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
