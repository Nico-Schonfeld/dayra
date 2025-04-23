"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import QuickViewModal from "@/components/quick-view-modal"

// Sample product data - this would typically come from a database
export const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    description:
      "Ultra-soft premium cotton t-shirt with a relaxed fit. Perfect for everyday wear with breathable fabric that keeps you comfortable all day long.",
    price: 29.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "New Arrival",
    category: "Clothing",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    weight: "180g",
    material: "100% Cotton",
    features: ["Breathable fabric", "Relaxed fit", "Machine washable", "Pre-shrunk"],
    stock: 45,
    sku: "TS-BLK-001",
  },
  {
    id: 2,
    name: "Classic Denim Jeans",
    description:
      "Timeless denim jeans with a comfortable stretch fit. These versatile jeans feature a classic five-pocket design and are perfect for any casual occasion.",
    price: 59.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "Bestseller",
    category: "Clothing",
    colors: ["Blue", "Black"],
    sizes: ["28", "30", "32", "34"],
    weight: "450g",
    material: "98% Cotton, 2% Elastane",
    features: ["Stretch denim", "Classic fit", "Five-pocket design", "Button closure"],
    stock: 32,
    sku: "DJ-BLU-002",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    description:
      "Elegant leather crossbody bag with adjustable strap. This stylish bag features multiple compartments to keep your essentials organized while on the go.",
    price: 89.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "Limited Edition",
    category: "Accessories",
    colors: ["Brown", "Black", "Tan"],
    dimensions: "25cm x 18cm x 8cm",
    weight: "350g",
    material: "Genuine Leather",
    features: ["Adjustable strap", "Multiple compartments", "Magnetic closure", "Interior zip pocket"],
    stock: 15,
    sku: "LB-BRN-003",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    description:
      "Premium sound quality with noise cancellation technology. These wireless headphones provide up to 30 hours of playtime and feature comfortable ear cushions for extended listening sessions.",
    price: 129.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "Sale",
    category: "Electronics",
    colors: ["Black", "White", "Silver"],
    weight: "250g",
    batteryLife: "30 hours",
    features: ["Active noise cancellation", "Bluetooth 5.0", "Touch controls", "Voice assistant compatible"],
    stock: 28,
    sku: "WH-BLK-004",
  },
  {
    id: 5,
    name: "Minimalist Watch",
    description:
      "Sleek design with premium materials and Japanese movement. This minimalist watch features a scratch-resistant sapphire crystal and stainless steel case.",
    price: 149.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Accessories",
    colors: ["Silver", "Gold", "Rose Gold"],
    dimensions: "40mm case diameter",
    weight: "80g",
    material: "Stainless Steel",
    features: ["Japanese quartz movement", "Sapphire crystal", "Water resistant to 50m", "Genuine leather strap"],
    stock: 20,
    sku: "MW-SLV-005",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    description:
      "Track your activity, sleep, and health metrics. This fitness tracker features a color touchscreen display and provides up to 7 days of battery life on a single charge.",
    price: 79.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "Popular",
    category: "Electronics",
    colors: ["Black", "Blue", "Pink"],
    weight: "25g",
    batteryLife: "7 days",
    features: ["Heart rate monitoring", "Sleep tracking", "Water resistant", "Smartphone notifications"],
    stock: 42,
    sku: "FT-BLK-006",
  },
  {
    id: 7,
    name: "Polarized Sunglasses",
    description:
      "UV protection with lightweight frame and polarized lenses. These stylish sunglasses feature a durable frame and provide 100% protection against harmful UV rays.",
    price: 49.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Accessories",
    colors: ["Black", "Tortoise", "Clear"],
    dimensions: "145mm temple length",
    weight: "28g",
    material: "Acetate frame, Polarized lenses",
    features: ["100% UV protection", "Polarized lenses", "Lightweight design", "Includes case and cleaning cloth"],
    stock: 35,
    sku: "PS-BLK-007",
  },
  {
    id: 8,
    name: "Scented Candle Set",
    description:
      "Set of 3 premium scented candles in decorative jars. Each candle is hand-poured using a soy wax blend and features unique fragrances that will transform your space.",
    price: 34.99,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    badge: "Gift Idea",
    category: "Home",
    scents: ["Vanilla", "Lavender", "Sandalwood"],
    weight: "350g each",
    burnTime: "40 hours each",
    features: ["Soy wax blend", "Cotton wick", "Decorative glass jars", "Gift box included"],
    stock: 25,
    sku: "SC-SET-008",
  },
]

// Categories for filtering
const categories = ["All", "Clothing", "Accessories", "Electronics", "Home"]

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category,
      // Default to first color and size if available
      color: product.colors ? product.colors[0] : undefined,
      size: product.sizes ? product.sizes[0] : undefined,
    })
  }

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product)
  }

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col h-full"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              {product.badge && (
                <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">{product.badge}</Badge>
              )}
            </div>
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </CardHeader>
            <CardContent className="p-3 pt-2 flex-grow">
              <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">{product.description}</p>

              {/* Additional product details */}
              <div className="mt-2 space-y-1 text-xs">
                {product.colors && (
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="outline" className="text-xs px-1.5 py-0">
                        {color}
                      </Badge>
                    ))}
                  </div>
                )}

                {product.sizes && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs px-1.5 py-0">
                        {size}
                      </Badge>
                    ))}
                  </div>
                )}

                {product.scents && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.scents.map((scent) => (
                      <Badge key={scent} variant="secondary" className="text-xs px-1.5 py-0">
                        {scent}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" size="sm" onClick={() => handleQuickView(product)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Quick View
                </Button>
                <Button className="flex-1" size="sm" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              <Link href={`/product/${product.id}`} className="w-full">
                <Button variant="ghost" className="w-full text-xs" size="sm">
                  View Full Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}

