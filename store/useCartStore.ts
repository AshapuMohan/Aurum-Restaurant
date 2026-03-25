import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MenuItem } from './useMenuStore'

export type CartItem = MenuItem & { quantity: number }

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  addToCart: (item: MenuItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

// Helper to parse price string "₹5,800" to number 5800
const parsePrice = (priceStr: string) => {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true }
      }),
      
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, quantity } : i)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
      }
    }),
    {
      name: 'aurum-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen state
    }
  )
)
