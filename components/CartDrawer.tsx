'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, getTotal } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const total = getTotal()

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return
    
    let message = "Hello Aurum, I would like to place an order:%0A%0A"
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.price})%0A`
    })
    
    message += `%0ATotal: ₹${total.toLocaleString('en-IN')}%0A%0APlease let me know the estimated preparation time.`
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911145678900'
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FAF8F3] shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold-500" />
                <h2 className="font-serif text-xl text-cream-50">Your Order</h2>
                <span className="bg-gold-500/10 text-gold-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {items.length} items
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} className="text-cream-50" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <ShoppingBag size={48} className="text-cream-100" />
                  <p className="text-cream-50">Your order is empty</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gold-500 hover:text-gold-600 text-sm font-medium"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded shadow-sm overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-cream-50 text-sm leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-black/30 hover:text-red-500 transition-colors mt-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      
                      <p className="text-gold-600 text-sm font-medium font-serif">{item.price}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-black/10 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-black/5 text-cream-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium text-cream-50">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-black/5 text-cream-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-cream-50 font-medium">Subtotal</span>
                  <span className="font-serif text-xl text-cream-50">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full btn-primary py-4 justify-center shadow-gold hover:shadow-gold-lg flex items-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Checkout via WhatsApp
                </button>
                <p className="text-center text-[10px] text-cream-100/50 mt-3 uppercase tracking-widest">
                  Taxes and charges calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
