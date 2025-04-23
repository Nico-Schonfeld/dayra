"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=500&width=800",
    alt: "Summer Collection",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=500&width=800",
    alt: "New Arrivals",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=500&width=800",
    alt: "Seasonal Deals",
  },
]

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current) => (current === 0 ? carouselItems.length - 1 : current - 1))
  const next = () => setCurrent((current) => (current === carouselItems.length - 1 ? 0 : current + 1))

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="w-full flex-none">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.alt}
              width={800}
              height={500}
              className="aspect-[16/9] sm:aspect-video w-full object-cover"
              priority
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prev}
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={next}
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 flex -translate-x-1/2 space-x-1 sm:space-x-2">
        {carouselItems.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
              current === index ? "bg-primary" : "bg-background/80"
            }`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

