'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/admin/menu')
        router.refresh()
      } else {
        setError(data.message || 'Invalid password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] mix-blend-multiply pointer-events-none bg-gold-500" />

      <motion.div 
        className="w-full max-w-sm glass p-10 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-gold-500 mx-auto flex items-center justify-center mb-6">
            <Lock size={18} className="text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl text-cream-50 mb-2">Admin Portal</h1>
          <p className="text-sm tracking-widest uppercase text-cream-100/50">Restricted Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password"
              placeholder="Enter master password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-black/10 text-cream-50 px-4 py-3 text-center text-sm focus:border-gold-500 outline-none tracking-widest placeholder:tracking-normal backdrop-blur-sm"
              required
            />
            {error && (
              <p className="text-red-500 text-xs text-center mt-3">{error}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary justify-center disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-black/5 pt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cream-100/40 hover:text-gold-500 transition-colors text-xs tracking-widest uppercase">
            <ArrowLeft size={14} />
            Return to Public Site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
