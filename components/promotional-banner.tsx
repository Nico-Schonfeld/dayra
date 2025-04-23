"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

type BannerProps = {
  title: string
  description?: string
  ctaText?: string
  ctaLink?: string
  dismissible?: boolean
  variant?: "primary" | "secondary" | "accent" | "info"
}

export default function PromotionalBanner({
  title,
  description,
  ctaText = "Shop Now",
  ctaLink = "/#products",
  dismissible = true,
  variant = "primary",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variantStyles = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  }

  return (
    <div className={`py-3 px-4 ${variantStyles[variant]}`}>
      <div className="container flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p className="font-medium text-center sm:text-left">{title}</p>
          {description && <p className="text-sm opacity-90 text-center sm:text-left">{description}</p>}
          {ctaText && (
            <Link href={ctaLink}>
              <Button variant={variant === "primary" ? "secondary" : "default"} size="sm" className="whitespace-nowrap">
                {ctaText}
              </Button>
            </Link>
          )}
        </div>

        {dismissible && (
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  )
}

