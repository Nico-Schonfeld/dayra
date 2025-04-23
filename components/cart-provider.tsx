"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
  category: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, color?: string, size?: string) => void
  updateQuantity: (id: number, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))

    // Calculate totals
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setItemCount(count)
    setTotal(cartTotal)
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists with same id, color, and size
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity

        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        })

        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${newItem.name} added to your cart`,
        })

        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: number, color?: string, size?: string) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id && item.color === color && item.size === size)

      if (itemIndex >= 0) {
        const itemToRemove = prevItems[itemIndex]

        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
        })

        const newItems = [...prevItems]
        newItems.splice(itemIndex, 1)
        return newItems
      }

      return prevItems
    })
  }

  const updateQuantity = (id: number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeItem(id, color, size)
      return
    }

    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id && item.color === color && item.size === size)

      if (itemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[itemIndex].quantity = quantity
        return updatedItems
      }

      return prevItems
    })
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

