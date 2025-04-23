"use client"

import { useCart } from "@/components/cart-provider"

export function CartCounter() {
  const { itemCount } = useCart()

  if (itemCount === 0) return null

  return (
    <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
      {itemCount > 99 ? "99+" : itemCount}
    </div>
  )
}

