"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/components/featured-products"

// Get featured products (those with badges)
const featuredProducts = products.filter((product) => product.badge)

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const prev = () => {
    setCurrent((current) => (current === 0 ? featuredProducts.length - 1 : current - 1))
    setAutoplay(false)
  }

  const next = () => {
    setCurrent((current) => (current === featuredProducts.length - 1 ? 0 : current + 1))
    setAutoplay(false)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((current) => (current === featuredProducts.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={next}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-full flex-none">
              <div className="grid md:grid-cols-2 gap-6 items-center p-4 md:p-8">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.badge && (
                    <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">{product.badge}</Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
                  <p className="line-clamp-3">{product.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/product/${product.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {featuredProducts.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`h-2 w-2 rounded-full p-0 ${current === index ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

