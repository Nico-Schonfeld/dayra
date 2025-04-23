"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionForm() {
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [value, setValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!value) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)

      // In a real app, you would send this data to your backend
      console.log("Subscription data:", {
        type: contactMethod,
        value,
      })
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Thank you for subscribing!</h3>
        <p className="text-muted-foreground">You've been successfully subscribed to our newsletter.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
      <p className="text-sm text-muted-foreground mb-4">Subscribe for updates on new products and exclusive offers.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup
          defaultValue="email"
          value={contactMethod}
          onValueChange={(value) => {
            setContactMethod(value as "email" | "phone")
            setValue("")
          }}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone">Phone</Label>
          </div>
        </RadioGroup>

        <div className="flex space-x-2">
          <Input
            type={contactMethod === "email" ? "email" : "tel"}
            placeholder={contactMethod === "email" ? "Enter your email" : "Enter your phone number"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              "Subscribe Now"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

