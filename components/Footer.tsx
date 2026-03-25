'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  Explore: ['Menu', 'Reservations', 'Gallery', 'About Us'],
  Experience: ['Private Dining', 'Wine Cellar', 'Chef\'s Table', 'Events'],
  Connect: ['Contact', 'Press', 'Careers', 'Gift Cards'],
}

const social = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#F5F0E8', borderTop: '1px solid rgba(201,151,28,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
                <span className="text-gold-500 text-xs font-serif">A</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] text-cream-50 uppercase">Aurum</span>
            </div>
            <p className="text-cream-100/40 text-sm leading-relaxed mb-6">
              Where every meal becomes a memory. Fine dining at the intersection of art and cuisine.
            </p>
            <div className="flex gap-3">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 border border-black/10 flex items-center justify-center text-cream-100/40 hover:border-gold-500/50 hover:text-gold-400 transition-all"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-cream-50/80 text-xs font-medium tracking-widest uppercase mb-5">{group}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link.toLowerCase().replace(/ /g, '-'))}
                      className="text-cream-100/40 text-sm hover:text-gold-400 transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-100/25 text-xs">
            © 2024 Aurum Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-cream-100/25 text-xs hover:text-cream-100/50 transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream-100/25 text-xs hover:text-cream-100/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
