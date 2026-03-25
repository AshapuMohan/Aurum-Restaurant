import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  category: string
  image: string
  badge?: string
}

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Wagyu Tenderloin',
    description: 'A5 Wagyu beef, truffle butter, bone marrow jus, roasted root vegetables',
    price: '₹5,800',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000',
    badge: 'Premium',
  },
  {
    id: '2',
    name: 'Lobster Bisque Risotto',
    description: 'Maine lobster, saffron risotto, crispy capers, chervil and lemon zest',
    price: '₹4,500',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1000',
  },
  {
    id: '3',
    name: 'Valrhona Chocolate Sphere',
    description: 'Warm chocolate sauce, raspberry coulis, gold leaf, vanilla bean ice cream',
    price: '₹1,400',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=1000',
  },
  {
    id: '4',
    name: 'Truffle Mushroom Arancini',
    description: 'Crispy risotto balls with black truffle, aged parmesan and saffron aioli',
    price: '₹1,200',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000',
    badge: "Chef's Pick",
  },
  {
    id: '5',
    name: 'Roasted Pepper Tomato Soup',
    description: 'Heirloom tomatoes, smoked bell peppers, basil oil, toasted sourdough',
    price: '₹900',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000',
  },
  {
    id: '6',
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard, caramelized sugar crust, fresh seasonal berries',
    price: '₹1,100',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?q=80&w=1000',
  },
  {
    id: '7',
    name: 'The Aurum Signature',
    description: 'Single malt whisky, elderflower, activated charcoal, gold shimmer',
    price: '₹1,800',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000',
    badge: 'Signature',
  },
  {
    id: '8',
    name: 'Sommelier Wine Pairing',
    description: 'Curated 3-course wine pairing selected by our master sommelier',
    price: '₹3,500',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000',
  },
]

type MenuStore = {
  items: MenuItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      items: initialMenuItems,
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
    }),
    {
      name: 'aurum-menu-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
