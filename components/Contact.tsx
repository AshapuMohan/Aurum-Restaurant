'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

const hours = [
  { days: 'Monday – Friday', time: '12:00 PM – 3:00 PM, 7:00 PM – 11:00 PM' },
  { days: 'Saturday', time: '12:00 PM – 3:30 PM, 6:30 PM – 11:30 PM' },
  { days: 'Sunday', time: '11:00 AM – 4:00 PM (Brunch), 7:00 PM – 10:30 PM' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="contact" ref={ref} className="section-padding overflow-hidden" style={{ background: '#FAF8F3' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Find Us</span>
          <h2 className="section-title mb-4">Contact & Location</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Info Cards */}
            <div className="glass p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-500/15 rounded-sm flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-cream-50 font-medium text-sm mb-1">Address</p>
                <p className="text-cream-100/50 text-sm leading-relaxed">
                  42 Connaught Place, New Delhi<br />
                  110001, India
                </p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-500/15 rounded-sm flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-cream-50 font-medium text-sm mb-1">Reservations</p>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_LINK || '+911145678900'}`}
                  className="text-gold-400 hover:text-gold-300 transition-colors text-sm font-medium"
                  id="click-to-call-btn"
                >
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 11 4567 8900'}
                </a>
                <p className="text-cream-100/40 text-xs mt-1">Available daily 10am – 11pm</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-500/15 rounded-sm flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-cream-50 font-medium text-sm mb-1">Email</p>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@aurumrestaurant.in'}`}
                  className="text-gold-400 hover:text-gold-300 transition-colors text-sm"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@aurumrestaurant.in'}
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="glass p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gold-500" />
                <p className="text-cream-50 font-medium text-sm">Opening Hours</p>
              </div>
              <div className="space-y-3">
                {hours.map((h, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-black/5 last:border-0">
                    <span className="text-cream-100/60 text-sm">{h.days}</span>
                    <span className="text-cream-50/80 text-sm text-right">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Map Embed */}
            <div className="h-72 sm:h-96 lg:h-full min-h-72 overflow-hidden border border-black/10 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7127774462527!2d77.21787!3d28.63277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aurum Restaurant Location"
                aria-label="Map showing the location of Aurum Restaurant"
              />
            </div>

            {/* Call button */}
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_LINK || '+911145678900'}`}
              className="btn-primary justify-center text-center flex items-center gap-2"
              id="contact-call-btn"
            >
              <Phone size={16} />
              Call to Reserve Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
