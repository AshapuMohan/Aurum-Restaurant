'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Calendar, Clock, User, Phone, CheckCircle, AlertCircle, XCircle, Download, CalendarPlus } from 'lucide-react'
import { toPng } from 'html-to-image'

const timeSlots = [
  { time: '12:00 PM', status: 'available' },
  { time: '1:00 PM', status: 'available' },
  { time: '2:00 PM', status: 'limited' },
  { time: '7:00 PM', status: 'available' },
  { time: '7:30 PM', status: 'limited' },
  { time: '8:00 PM', status: 'full' },
  { time: '8:30 PM', status: 'available' },
  { time: '9:00 PM', status: 'available' },
  { time: '9:30 PM', status: 'limited' },
]

const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7+ Guests']

type FormState = {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  notes: string
}

type Errors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.phone.match(/^[+]?[\d\s\-]{8,15}$/)) errors.phone = 'Enter a valid phone number'
  if (!form.date) errors.date = 'Please select a date'
  if (!form.time) errors.time = 'Please select a time slot'
  if (!form.guests) errors.guests = 'Please select number of guests'
  return errors
}

export default function Reservations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const [form, setForm] = useState<FormState>({
    name: '', phone: '', date: '', time: '', guests: '', notes: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableInfo, setTableInfo] = useState('')
  const ticketRef = useRef<HTMLDivElement>(null)

  const downloadTicket = async () => {
    if (ticketRef.current === null) return
    try {
      const dataUrl = await toPng(ticketRef.current, { quality: 1, backgroundColor: '#FFFFFF' })
      const link = document.createElement('a')
      link.download = 'Aurum-Reservation.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
    }
  }

  const getGoogleCalendarUrl = () => {
    try {
      const [timeStr, modifier] = form.time.split(' ')
      let [hours, minutes] = timeStr.split(':')
      let hrs = parseInt(hours, 10)
      if (modifier === 'PM' && hrs < 12) hrs += 12
      if (modifier === 'AM' && hrs === 12) hrs = 0

      const start = new Date(`${form.date}T${hrs.toString().padStart(2, '0')}:${minutes}:00`)
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

      const format = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
      const text = encodeURIComponent('Aurum Reservation')
      const details = encodeURIComponent(`Reservation for ${form.guests} under ${form.name}.\n\nTable: ${tableInfo}`)
      const location = encodeURIComponent('Aurum, 42 Connaught Place, New Delhi')
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${format(start)}/${format(end)}&details=${details}&location=${location}`
    } catch {
      return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Aurum+Reservation'
    }
  }

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    // Simulate API call — replace with actual endpoint
    await new Promise(res => setTimeout(res, 1500))
    setLoading(false)
    setTableInfo(`Table ${Math.floor(Math.random() * 20) + 1} - ${Math.random() > 0.5 ? 'VIP Window' : 'Main Dining'}`)
    setSubmitted(true)
  }

  const statusBadge = (status: string) => {
    if (status === 'available') return <span className="badge-available">Available</span>
    if (status === 'limited') return <span className="badge-limited">Limited</span>
    return <span className="badge-full">Full</span>
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reservations" ref={ref} className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF8F3 0%, #FFFFFF 100%)' }}
    >
      {/* Gold ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #C9971C 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Reservations</span>
          <h2 className="section-title mb-4">Secure Your Evening</h2>
          <div className="gold-divider mb-6" />
          <p className="text-cream-100/55 text-base max-w-lg mx-auto leading-relaxed">
            Reserve your table and prepare for an unforgettable evening.
            We recommend booking 48 hours in advance for preferred seating.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="flex flex-col items-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* The Ticket */}
            <div ref={ticketRef} className="w-full glass-gold rounded-md p-8 sm:p-10 mb-8 relative overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid rgba(201, 151, 28, 0.3)' }}>
              {/* Decorative background elements for ticket */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -ml-10 -mb-10" />

              <div className="text-center border-b border-gold-500/20 pb-6 mb-6">
                <div className="w-12 h-12 border border-gold-500 mx-auto flex items-center justify-center mb-4">
                  <span className="text-gold-500 text-lg font-serif">A</span>
                </div>
                <h3 className="font-serif text-3xl text-gold-400 mb-1">Reservation Confirmed</h3>
                <p className="text-cream-100/60 text-sm tracking-widest uppercase">Aurum Fine Dining</p>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-cream-100/40 text-[10px] tracking-widest uppercase mb-1">Guest</p>
                  <p className="text-cream-50 font-serif text-lg">{form.name}</p>
                </div>
                <div>
                  <p className="text-cream-100/40 text-[10px] tracking-widest uppercase mb-1">Date & Time</p>
                  <p className="text-cream-50 font-serif text-lg">{form.date} <br className="hidden sm:block" />at {form.time}</p>
                </div>
                <div>
                  <p className="text-cream-100/40 text-[10px] tracking-widest uppercase mb-1">Party Size</p>
                  <p className="text-cream-50 font-serif text-lg">{form.guests}</p>
                </div>
                <div>
                  <p className="text-cream-100/40 text-[10px] tracking-widest uppercase mb-1">Allocation</p>
                  <p className="text-cream-50 font-serif text-lg text-gold-400">{tableInfo}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button onClick={downloadTicket} className="btn-primary flex-1 justify-center">
                <Download size={16} /> Download Pass
              </button>
              <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center">
                <CalendarPlus size={16} /> Add to Calendar
              </a>
            </div>

            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', time: '', guests: '', notes: '' }) }}
              className="mt-8 text-cream-100/40 text-xs hover:text-gold-400 uppercase tracking-widest transition-colors"
            >
              Make Another Reservation
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 glass p-8 space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs text-cream-100/50 tracking-widest uppercase mb-2">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-100/30" />
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange('name')}
                      className={`form-input pl-9 ${errors.name ? 'border-red-500/50' : ''}`}
                      aria-label="Full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-cream-100/50 tracking-widest uppercase mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-100/30" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={`form-input pl-9 ${errors.phone ? 'border-red-500/50' : ''}`}
                      aria-label="Phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs text-cream-100/50 tracking-widest uppercase mb-2">Date</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-100/30" />
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={handleChange('date')}
                      className={`form-input pl-9 ${errors.date ? 'border-red-500/50' : ''}`}
                      style={{ colorScheme: 'dark' }}
                      aria-label="Reservation date"
                    />
                  </div>
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs text-cream-100/50 tracking-widest uppercase mb-2">Guests</label>
                  <div className="relative">
                    <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-100/30" />
                    <select
                      value={form.guests}
                      onChange={handleChange('guests')}
                      className={`form-input pl-9 ${errors.guests ? 'border-red-500/50' : ''}`}
                      aria-label="Number of guests"
                    >
                      <option value="">Select guests</option>
                      {guestOptions.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs text-cream-100/50 tracking-widest uppercase mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Dietary preferences, special occasions, seating preferences..."
                  value={form.notes}
                  onChange={handleChange('notes')}
                  className="form-input resize-none"
                  aria-label="Special requests"
                />
              </div>

              {/* Time error */}
              {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}

              <motion.button
                type="submit"
                className="btn-primary w-full justify-center text-sm py-4"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                id="confirm-reservation-btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Confirming Reservation...
                  </span>
                ) : 'Confirm Reservation'}
              </motion.button>
            </form>

            {/* Time Slots */}
            <div className="lg:col-span-2">
              <div className="glass p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={16} className="text-gold-500" />
                  <h3 className="text-cream-50 text-sm font-medium tracking-wider uppercase">Available Slots</h3>
                </div>

                <div className="space-y-2.5">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.status === 'full'}
                      onClick={() => {
                        if (slot.status !== 'full') {
                          setForm(prev => ({ ...prev, time: slot.time }))
                          if (errors.time) setErrors(prev => ({ ...prev, time: undefined }))
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 border transition-all duration-200 rounded-sm ${form.time === slot.time
                        ? 'border-gold-500 bg-gold-500/10'
                        : slot.status === 'full'
                          ? 'border-black/5 opacity-40 cursor-not-allowed'
                          : 'border-black/5 hover:border-gold-500/40 hover:bg-black/5 cursor-pointer'
                        }`}
                    >
                      <span className="text-cream-50 text-sm">{slot.time}</span>
                      <div className="flex items-center gap-2">
                        {statusBadge(slot.status)}
                        {form.time === slot.time && (
                          <CheckCircle size={14} className="text-gold-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-5 pt-5 border-t border-black/5 flex flex-wrap gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5 text-cream-100/40">
                    <CheckCircle size={11} className="text-green-400" /> Available
                  </span>
                  <span className="flex items-center gap-1.5 text-cream-100/40">
                    <AlertCircle size={11} className="text-yellow-400" /> Limited
                  </span>
                  <span className="flex items-center gap-1.5 text-cream-100/40">
                    <XCircle size={11} className="text-red-400" /> Fully Booked
                  </span>
                </div>
              </div>

              {/* Note */}
              <p className="text-cream-100/30 text-xs mt-4 text-center leading-relaxed">
                Reservations held for 15 minutes past booking time.
                For parties of 8+, please call us directly.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
