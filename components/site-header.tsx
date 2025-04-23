"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartCounter } from "@/components/cart-counter";
import Image from "next/image";

export default function SiteHeader() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Close the search bar
      setIsSearchOpen(false);

      // Scroll to the shop section
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth" });
      }

      // Trigger the search filter in the product grid
      // We'll use a custom event to communicate with the ProductGrid component
      const searchEvent = new CustomEvent("product-search", {
        detail: { query: searchQuery.trim() },
      });
      window.dispatchEvent(searchEvent);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/dayra_logo_2.svg"
            alt="LUXE"
            width={55}
            height={100}
          />
        </Link>

        {/* Desktop Navigation */}
        {/*  <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/#featured"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Featured
          </Link>
          <Link
            href="/#collections"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/#shop"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav> */}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span className="sr-only">Search</span>
          </Button>

          {/* Shopping Cart */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <CartCounter />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/#featured"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Featured
                </Link>
                <Link
                  href="/#collections"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/#shop"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/#about"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/cart"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Cart
                </Link>
                <Link
                  href="#"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`w-full bg-background border-b transition-all duration-300 overflow-hidden ${
          isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pl-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4"
            >
              Buscar
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
