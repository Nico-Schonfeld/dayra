"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <Link href="/" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Home
            </Button>
          </Link>
          <Link href="/#products" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              About
            </Button>
          </Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Contact
            </Button>
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Cart
            </Button>
          </Link>
          <Button className="mt-4">Sign In</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

