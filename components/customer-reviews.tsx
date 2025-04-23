"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent quality and fast shipping",
    comment:
      "I'm extremely satisfied with my purchase. The quality exceeded my expectations and the shipping was incredibly fast. Will definitely shop here again!",
    productName: "Premium Cotton T-Shirt",
    productId: 1,
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    title: "Great product, minor sizing issue",
    comment:
      "The product is great overall. The material feels premium and durable. My only issue was that it runs slightly smaller than expected, so consider sizing up.",
    productName: "Classic Denim Jeans",
    productId: 2,
    verified: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "3 weeks ago",
    title: "Perfect gift option",
    comment:
      "I bought this as a gift for my sister and she absolutely loved it! The packaging was beautiful and the product itself is high quality. Highly recommend for gift-giving.",
    productName: "Leather Crossbody Bag",
    productId: 3,
    verified: true,
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2 months ago",
    title: "Great value for money",
    comment:
      "For the price point, this product offers excellent value. It has all the features I was looking for and the build quality is solid. Very happy with my purchase.",
    productName: "Wireless Headphones",
    productId: 4,
    verified: false,
  },
  {
    id: 5,
    name: "Jessica Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 week ago",
    title: "Exceeded my expectations",
    comment:
      "I wasn't sure what to expect, but this product has completely exceeded my expectations. The attention to detail is impressive and it works perfectly. Couldn't be happier!",
    productName: "Minimalist Watch",
    productId: 5,
    verified: true,
  },
]

export default function CustomerReviews() {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const displayedReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={prevPage}
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={nextPage}
            disabled={totalPages <= 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                {review.verified && (
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</div>
                )}
              </div>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <h3 className="font-semibold mb-2">{review.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>

              <div className="text-xs text-muted-foreground">
                Reviewed: <span className="font-medium text-foreground">{review.productName}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className={`h-8 w-8 rounded-full mx-1 ${currentPage === i ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

