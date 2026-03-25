'use client'

import { useState } from 'react'
import { useMenuStore } from '@/store/useMenuStore'
import { Plus, Trash2, ArrowLeft, Image as ImageIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminMenuPage() {
  const { items, addItem, removeItem } = useMenuStore()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image: '',
    badge: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addItem({
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      description: formData.description,
      // Ensure price is formatted with ₹ if not already
      price: formData.price.startsWith('₹') ? formData.price : `₹${formData.price}`,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', // fallback
      badge: formData.badge || undefined
    })

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course',
      image: '',
      badge: ''
    })
    
    alert('Menu item added successfully!')
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-dark-200 text-cream-50 pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] mix-blend-multiply pointer-events-none bg-gold-500" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-cream-100/50 hover:text-gold-500 transition-colors text-sm tracking-widest uppercase mb-4">
              <ArrowLeft size={16} />
              Return Home
            </Link>
            <h1 className="font-serif text-4xl lg:text-5xl text-cream-50 mb-2">Menu Management</h1>
            <p className="text-cream-100/60">Add, view, or remove items from the dynamic menu.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-black/10 text-sm tracking-widest uppercase text-cream-100/70 hover:text-red-500 hover:border-red-500/30 transition-colors bg-white/5 backdrop-blur-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Add Item Form */}
          <motion.div 
            className="lg:col-span-1 glass p-8 self-start sticky top-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-serif text-2xl text-cream-50 mb-6 flex items-center gap-3">
              <Plus size={20} className="text-gold-500" />
              Add New Dish
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1">Dish Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-black/10 text-gray-900 px-4 py-3 rounded-sm text-sm focus:border-gold-500 outline-none"
                  placeholder="e.g. Osetra Caviar"
                />
              </div>

              <div>
                <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1">Description *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white border border-black/10 text-gray-900 px-4 py-3 rounded-sm text-sm focus:border-gold-500 outline-none resize-none"
                  placeholder="Ingredients and preparation..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1">Price *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-white border border-black/10 text-gray-900 px-4 py-3 rounded-sm text-sm focus:border-gold-500 outline-none"
                    placeholder="e.g. 2,500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1">Category *</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white border border-black/10 text-gray-900 px-4 py-3 rounded-sm text-sm focus:border-gold-500 outline-none"
                  >
                    <option className="text-gray-900" value="Starters">Starters</option>
                    <option className="text-gray-900" value="Main Course">Main Course</option>
                    <option className="text-gray-900" value="Desserts">Desserts</option>
                    <option className="text-gray-900" value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1 flex items-center gap-2">
                  <ImageIcon size={12} />
                  Dish Image (Upload)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full bg-white border border-black/10 text-gray-900 px-3 py-2.5 rounded-sm text-sm focus:border-gold-500 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-dark-100 file:text-cream-50 hover:file:bg-dark-200 cursor-pointer"
                    />
                  </div>
                  {formData.image && formData.image.startsWith('data:') && (
                    <div className="w-12 h-12 relative rounded border border-black/10 overflow-hidden flex-shrink-0 bg-white">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-cream-100/60 tracking-widest uppercase mb-1">Badge (Optional)</label>
                <input 
                  type="text" 
                  value={formData.badge}
                  onChange={e => setFormData({...formData, badge: e.target.value})}
                  className="w-full bg-white border border-black/10 text-gray-900 px-4 py-3 rounded-sm text-sm focus:border-gold-500 outline-none"
                  placeholder="e.g. Signature"
                />
              </div>

              <button type="submit" className="w-full btn-primary justify-center mt-6">
                Add to Menu
              </button>
            </form>
          </motion.div>

          {/* Current Items List */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-serif text-2xl text-cream-50 mb-6 flex items-center justify-between">
              Current Menu Output
              <span className="text-sm font-sans tracking-widest uppercase text-cream-100/50">
                {items.length} items
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="glass p-4 flex gap-4 h-32 group relative pr-12">
                  <div className="w-24 h-full relative rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-gold-500/70 tracking-widest uppercase mb-1">{item.category}</span>
                    <h3 className="font-serif text-cream-50 leading-tight mb-1">{item.name}</h3>
                    <span className="text-sm font-medium text-gold-500">{item.price}</span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 p-2 text-black/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            {items.length === 0 && (
              <div className="glass p-12 text-center text-cream-100/50">
                Menu is currently empty.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
